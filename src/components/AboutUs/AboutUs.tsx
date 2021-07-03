import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import MarkdownParser from "../MarkdownParser/MarkdownParser";
import { Header, Grid, Image, Placeholder } from "semantic-ui-react";
import aboutUsArticle from "../../articles/about-us.md";

import { Contributor } from "./types";

const AboutUs = (): JSX.Element => {
  const [contributors, setContributors] = useState<Contributor[]>(null);
  const [contributorsLoaded, setContributorsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const octokit = new Octokit();
    octokit.rest.repos
      .listContributors({
        owner: "AndrewLawendy",
        repo: "css-guru",
      })
      .then(({ data }) => {
        const contributors: Contributor[] = data.map(
          ({
            login,
            avatar_url: avatarUrl,
            html_url: htmlUrl,
            contributions,
          }) => ({ login, avatarUrl, htmlUrl, contributions })
        );

        setContributors(contributors);
      })
      .finally(() => setContributorsLoaded(true));
  }, []);

  function constructContributor({
    login,
    avatarUrl,
    htmlUrl,
    contributions,
  }: Contributor) {
    return (
      <Grid.Column mobile="4" tablet="4" computer="2">
        <a
          key={htmlUrl}
          href={htmlUrl}
          title={`${login} - ${contributions} commits`}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={avatarUrl} alt={login} />
          <span>{login}</span>
        </a>
      </Grid.Column>
    );
  }

  return (
    <MarkdownParser title="About Us" file={aboutUsArticle}>
      <>
        <Header as="h2">Contributors</Header>
        <Grid>
          {contributorsLoaded
            ? contributors.map(constructContributor)
            : Array.from({ length: 8 }, (_, index) => (
                <Grid.Column
                  key={`placeholder-image-${index}`}
                  mobile="4"
                  tablet="4"
                  computer="2"
                >
                  <Placeholder>
                    <Placeholder.Image square />
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </Grid.Column>
              ))}
        </Grid>
      </>
    </MarkdownParser>
  );
};

export default AboutUs;
