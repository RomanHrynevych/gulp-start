import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import FtpDeploy from "ftp-deploy";
const ftpDeploy = new FtpDeploy();
import colors from "colors";

dotenv.config();

const { USER, PASSWORD, DIRECTORY, HOST } = process.env;
const path = process.argv[2];

const config = {
  user: USER,
  password: PASSWORD,
  host: HOST,
  localRoot: "dist",
  remoteRoot: `/${path || DIRECTORY}/`,
  include: ["*", "**/*"],
  exclude: ["node_modules/**", "node_modules/**/.*", ".git/**"],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};
console.log("Uploading... Wait please!");

ftpDeploy
  .deploy(config)
  .then((res) => {
    console.log(res);
    console.log(
      `Success! Local root "${config.localRoot}" have been uploaded to the server (${config.remoteRoot}).`
    );
  })
  .catch((err) => console.log(err));

ftpDeploy.on("uploading", function (data) {
  console.log(
    `${data.transferredFileCount + 1} / ${
      data.totalFilesCount + 1
    } - ${colors.bold.green(data.filename)}`
  );
});
