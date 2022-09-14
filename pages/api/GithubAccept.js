const axios = require("axios");
export default async function handler(req, res) {
  const { GitHubUsername } = req.body;
  const response = await axios.get(
    `https://education.github.com/student/verify/generate?school_id=${process.env.SCHOOLID}&student_id=${GitHubUsername}&secret_key=${process.env.SECRETKEY}`
  );
  if (response.data.error) {
    return res.status(404).send({
      response: response.data,
    });
  } else {
    res.status(200).json({ response: response.data });
  }
}
