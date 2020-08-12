const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const FxJS = require('fxjs');
const L = require('fxjs/Lazy');

Object.assign(global, FxJS);

const PORT = 7070;

const app = express();
app.use('/', express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

let post_id = 1, course_id = 1, cmt_id = 1;
const Courses = go(
  ['자바스크립트 기초 강의', 'nodejs 기초 강의', '파이썬 기초 강의', '자바 기초 강의', '자바 심화 강의', '진짜 어려운 강의'],
  map(title => ({ id: course_id++, title })));
const Posts = go(
  [{
    author: '인프런',
    title: '궁금한데 궁금한게 궁금해요.',
    body: '안녕하세요! 궁금한게 궁금해서 질문 올립니다!',
    course_id: 1,
    is_resolved: false,
    created_at: new Date('2020-03-02 10:10'),
  }, {
    author: '궁금이',
    title: '파이썬 강의를 듣던 중에 궁금한게 있습니다.',
    body: 'print 가 뭔지 모르겠어요... 알려주세요',
    course_id: 3,
    is_resolved: true,
    created_at: new Date('2020-03-02 12:17'),
  }],
  map(obj => ({ id: post_id++, ...obj })));
const Comments = go(
  [{ post_id: 2, body: 'print는 출력하는 거에요 ^^7', author: '해결사', created_at: new Date('2020-03-02 13:45') }],
  map(obj => ({ id: cmt_id++, ...obj })));

app.get('/api/posts', (req, res) => {
  const { query: { page, s, is_resolved } } = req;
  const p = parseInt(page) || 1, LIMIT = 10;
  go(
    Posts,
    !s ? identity : L.filter(pipe(pick(['author', 'title', 'body']), L.values, find(v => (v || '').indexOf(s) > -1))),
    match(is_resolved)
      .case('true')(constant(L.filter(sel('is_resolved'))))
      .case('false')(constant(L.reject(sel('is_resolved'))))
      .else(constant(identity)),
    sortByDesc(sel('id')),
    L.entries,
    L.filter(([i]) => (p - 1) * LIMIT <= i && i < p * LIMIT),
    L.map(([, v]) => v),
    take(LIMIT),
    posts => res.json({ posts, count: Posts.length }));
});

app.get('/api/posts/:id', (req, res) => {
  const { params: { id } } = req;
  const post = sel(`#${id}`, Posts);
  const comments = go(Comments, filter(isMatch({ post_id: id })));
  res.json({ post: post && extend(post, { _: { comments } }) });
});

app.post('/api/posts', (req, res) => {
  const { body: { author, title, body, course_id } } = req;
  const post = { id: post_id++, author, title, body, course_id, is_resolved: false, created_at: new Date() };
  Posts.push(post);
  res.json({ post });
});

app.put('/api/posts/:id/is_resolved', (req, res) => {
  const { params: { id }, body: { is_resolved } } = req;
  const post = go(Posts, sel(`#${id}`));
  res.json({ post: extend(post, { is_resolved }) });
});

app.get('/api/courses', (req, res) => {
  res.json({ courses: Courses });
});

app.post('/api/comments', (req, res) => {
  const { body: { post_id, body, author } } = req;
  const comment = { id: cmt_id++, post_id, body, author, created_at: new Date() };
  Comments.push(comment);
  res.json({ comment });
});

app.listen(PORT, () => console.log(`server started: http://localhost:${PORT}/`));
