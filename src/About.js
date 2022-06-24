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
        Vegan Bingo was inspired by (what I think is) the original Omnivore
        Rationalization Bingo by Vegnews. It is made to make light of the things
        we hear so often as vegans. It's not meant to make fun of anybody, just
        to make fun.
      </p>
      <p>
        If you'd like to get in touch about the app or anything else, or just
        want to read my thoughts, check out my web page at: <a
        href="https://camerongreen.org" target="_blank">camerongreen.org</a>
      </p>
      <p>
        You can chat more about Vegan Bingo, post your times, watch tumble weeds
        roll past (seriously there have been like 2 posts ever), etc at: <a
        href="https://facebook.com/veganbingo"
        target="_blank">facebook.com/veganbingo</a>
      </p>
      <p>
        To read the privacy terms or other FAQs about the app: <a
        href="https://camerongreen.org/a/veganbingo" target="_blank">Vegan Bingo
        on E.A.R.T.H.</a>.
      </p>
      <p>
        This work is licensed under the Creative Commons
        Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a
        copy of this license, visit <a
        href="http://creativecommons.org/licenses/by-nc-sa/3.0/"
        target="_blank">Creative Commons</a>
      </p>
      <p>Ahimsa!</p>
    </InfoPage>
  );
}
