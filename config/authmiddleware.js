const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const users = require("../model/users");

dotenv.config();

const sign_token = {
  issuer: "contoh.com",
  subject: "contoh.com",
  algorithm: "HS256",
  expiresIn: "1d",
  audience: "http://contoh.com",
};

const userAuth = async (req, res, next) => {
  try {
    const data = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      sign_token
    );

    console.log(data, "data from decoded userAuth middleware");
    const query = {
      where: {
        username: data.username,
      },
      raw: true,
    };
    const user = await users.findOne(query);

    if (!user) {
      return res.status(400).send({
        message: "user not found",
      });
    }

    return next();
  } catch (err) {
    return res.status(400).send({
      message: "please login",
    });
  }
};

const checkRole = async (req, res, next) => {
  try {
    const data = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      sign_token
    );

    //console.log(data, "data from decoded checkRole middleware");
    if (data.role_id === 7) {
      return next();
    } else {
      return res.status(200).send({
        message: "no authorization!!",
      });
    }
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};

// key admin exp 1 day
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZV9pZCI6MSwibmFtZSI6IlN1cGVyIEFkbWluIiwidXNlcm5hbWUiOiJhZG1pbmtlcmVuIiwicGFzc3dvcmQiOiIkMmIkMTAkYXhRL21pTU95bGRsU1hveHlsQlYwdU1qYmVuTVo4Wi9FekZMUG5rTDFyVzVxRlBJdlZxaTYiLCJlbWFpbCI6InN1cGVyYWRtaW5AZW1haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjAtMDctMjVUMDU6Mzc6NTYuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIwLTA3LTI2VDE3OjE1OjMwLjAwMFoiLCJkZWxldGVkX2F0IjpudWxsLCJyb2xlLmlkIjoxLCJyb2xlLm5hbWUiOiJhZG1pbiIsInJvbGUuY3JlYXRlZF9hdCI6IjIwMjAtMDctMjZUMTc6MTM6MjIuMDAwWiIsInJvbGUudXBkYXRlZF9hdCI6IjIwMjAtMDctMjZUMTc6MTM6MjIuMDAwWiIsInJvbGUuZGVsZXRlZF9hdCI6bnVsbCwiaWF0IjoxNTk1NzY4NTE4LCJleHAiOjE1OTU4NTQ5MTgsImF1ZCI6Imh0dHA6Ly9jb250b2guY29tIiwiaXNzIjoiY29udG9oLmNvbSIsInN1YiI6ImNvbnRvaC5jb20ifQ.YGQSq6FFyejvbUPTEpl7OIaVRvQgNc4cjYYiE6k4hfY

// key members exp 1 day
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZV9pZCI6MiwibmFtZSI6Ik1pa2UgUG9ydG5veSIsInVzZXJuYW1lIjoicG9ydG5veSIsInBhc3N3b3JkIjoiJDJiJDEwJGNWUVN2bTIvcmYzSGcuUmd3QXdqSGVwb2h0L2lNaUJQVDBmVXlST3AucEVJZlBLTkxaVEZtIiwiZW1haWwiOiJwb3J0bm95QGdtYWlsLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIwLTA3LTI2VDExOjI3OjI0LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0yNlQxMToyNzoyNC4wMDBaIiwiZGVsZXRlZF9hdCI6bnVsbCwicm9sZS5pZCI6Miwicm9sZS5uYW1lIjoibWVtYmVyIiwicm9sZS5jcmVhdGVkX2F0IjoiMjAyMC0wNy0yNlQxNzoxNDo1NC4wMDBaIiwicm9sZS51cGRhdGVkX2F0IjoiMjAyMC0wNy0yNlQxNzoxNDo1NC4wMDBaIiwicm9sZS5kZWxldGVkX2F0IjpudWxsLCJpYXQiOjE1OTU3NjI4NjcsImV4cCI6MTU5NTg0OTI2NywiYXVkIjoiaHR0cDovL2NvbnRvaC5jb20iLCJpc3MiOiJjb250b2guY29tIiwic3ViIjoiY29udG9oLmNvbSJ9.VPGB3qAn79WltnVo5UBCPYhWw74EOhOoA8iwZuzB8_Q

// key fake admin exp 1 day
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZV9pZCI6MSwibmFtZSI6IllvZ2EgTGFoaXBhIiwidXNlcm5hbWUiOiJ5b2dhbGFoaXBhIiwicGFzc3dvcmQiOiIkMmIkMTAkLllpdzBpSkU0RVdwUkRhWXFuNTdBT3ZCWlZuUkxKbkZqV2xRdFNlM1lYTWZUVVViMlhpd20iLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIwLTA3LTIyVDA4OjI2OjI2LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0yNlQxNzoxNToyMS4wMDBaIiwiZGVsZXRlZF9hdCI6bnVsbCwicm9sZS5pZCI6MSwicm9sZS5uYW1lIjoiYWRtaW4iLCJyb2xlLmNyZWF0ZWRfYXQiOiIyMDIwLTA3LTI2VDE3OjEzOjIyLjAwMFoiLCJyb2xlLnVwZGF0ZWRfYXQiOiIyMDIwLTA3LTI2VDE3OjEzOjIyLjAwMFoiLCJyb2xlLmRlbGV0ZWRfYXQiOm51bGwsImlhdCI6MTU5NTc2Nzg2OSwiZXhwIjoxNTk1ODU0MjY5LCJhdWQiOiJodHRwOi8vY29udG9oLmNvbSIsImlzcyI6ImNvbnRvaC5jb20iLCJzdWIiOiJjb250b2guY29tIn0.cssKKOieFMVU2B4TxRcBwDmxTQB0_die6zKvQX01Cwc

module.exports = { userAuth, checkRole };
