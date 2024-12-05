#!/usr/bin/env node
const yargs = require("yargs");
const { scrape } = require("./scrapper");
const fs = require("fs");
const ObjectsToCsv = require("objects-to-csv");
yargs
  .scriptName("scrappio-cli")
  .usage("$0 <command> [args]")
  .command(
    "scrape",
    "Scrape a user's bio from GitHub",
    (yargs) => {
      yargs.option("userName", {
        describe: "Github user name",
        type: "string",
        demandOption: true,
      });
    },
    async (argv) => {
      try {
        const userBio = await scrape(argv.userName);
        const filePath = "bio data.csv";
        //create file pathif not exists
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, "");
        }

        const existingData =
          fs.existsSync(filePath) &&
          fs.readFileSync(filePath, "utf8").trim() !== ""
            ? fs
                .readFileSync(filePath, "utf8")
                .split("\n")
                .slice(1)
                .map((line) => {
                  const [username, ...bioParts] = line.split(",");
                  const bio = bioParts.join(",").replace(/^"|"$/g, "");
                  return { username, bio };
                })
            : [];

        //check if the user already exists
        const userExists = existingData.some(
          (user) => user.username === argv.userName
        );
        if (userExists) {
          console.log(
            `${argv.userName}'s github bio already exists in "bio data.csv"`
          );
          return;
        }

        //write to a csv file
        const bioData = { username: argv.userName, bio: userBio };
        const csv = new ObjectsToCsv([...existingData, bioData]);
        await csv.toDisk(filePath);
      } catch (err) {
        console.log(err.message);
      }
    }
  )
  .help().argv;
