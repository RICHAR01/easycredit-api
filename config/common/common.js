export default {
  port: process.env.PORT || 4000,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }
}
