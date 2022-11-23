import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import InfoPage from './InfoPage';

export default function About() {
  return (
    <InfoPage icon={<InfoIcon fontSize="large"/>} heading="About Vegan Bingo">
      <p>
        Hi :)
      </p>
      <p>
        I went vegan around the turn of the millenium. In the many years since I
        hear the same questions asked repeatedly. Vegan Bingo was developed to make
        a little light hearted fun from this reality, and also to give people
        some ideas for how to answer common questions. I try to remember
        we had to learn all of this at some time ourselves, and that though we
        may have heard a question a thousand times, it might still be the first
        time someone asked it. I also think we shouldn't pretend we have all the
        answers, hopefully the person you are talking to is just another person
        trying to figure out how to do good in this world just
        like we are. You might just plant a seed in even the most resistant mind.
      </p>
      <p>
        If you'd like to get in touch about Vegan Bingo or anything else, or just
        want to read my thoughts, check out my web page at: <a
        href="https://camerongreen.org" target="_blank">camerongreen.org</a>
      </p>
      <p>
        You can chat more about Vegan Bingo, post your times, watch tumble weeds
        roll past (seriously there have been like 2 posts ever) at: <a
        href="https://facebook.com/veganbingo"
        target="_blank">facebook.com/veganbingo</a>
      </p>
      <p>
        To read the privacy terms or other FAQs about the app: <a
        href="https://camerongreen.org/a/veganbingo" target="_blank">Vegan Bingo
        on E.A.R.T.H.</a>. In short it only stores data in a cookie and I don't take any identifying information. I have put Google Analytics on it now, but I won't be using it to target ads or anything else, just want to know how many people are using it.
      </p>
      <p>
        Vegan Bingo was inspired by (what I think is) the original Omnivore
        Rationalization Bingo by Vegnews.
      </p>
      <p>
        This work is licensed under the Creative Commons
        Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a
        copy of this license, visit <a
        href="http://creativecommons.org/licenses/by-nc-sa/3.0/"
        target="_blank">Creative Commons</a>. Source code for the application is here: <a
        href="https://github.com/camerongreen/veganbingo-react">Vegan Bingo on Github</a>.
      </p>
      <p>Ahimsa!</p>
    </InfoPage>
  );
}
