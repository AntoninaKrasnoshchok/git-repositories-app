const nodemailer = require("nodemailer");

process.on("message", async (repositories) => {
  const content = repositories.map(({ name, url }) => (`<tr><td>${name}</td><td>${url}</td></tr>`));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "antonina.krasnoshchok@gmail.com",
      pass: "abbzvcbhjvedfuog",
    },
  });

  transporter.sendMail({
    from: "antonina.krasnoshchok@gmail.com",
    to: "antonina.krasnoshchok@keenethics.com",
    subject: "GitHub repositories",
    text: "GitHub repositories",
    html: `<table>${content.join("")}</table>`,
  })
    .then(() => process.send({ isSent: true }))
    .catch(() => process.send({ isSent: false }));
});
