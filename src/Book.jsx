import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import InfoPage from './InfoPage';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Book() {
  return (
    <InfoPage icon={<InfoIcon fontSize="large"/>}
              heading="Vegan Bingo! The Book">
      <p>
        To make it easier to read all the answers here, you can download Vegan Bingo as <strong>Vegan
        FAQ - Answering common questions about veganism</strong> in a variety of formats.
      </p>
      <p>
        <MenuBookIcon/> <a target="_blank" rel="noreferrer"
        href="/files/Vegan_FAQ_epub_v2.epub">
        Download Epub (Epub version 2)</a>.
      </p>
      <p>
        <MenuBookIcon/> <a target="_blank" rel="noreferrer"
        href="/files/Vegan_FAQ_epub_v3.epub">
        Download Epub (Epub version 3)</a>.
      </p>
      <p>
        <PictureAsPdfIcon/> <a target="_blank" rel="noreferrer"
        href="/files/Vegan_FAQ.pdf">
        Download PDF version</a>.
      </p>
      <h3>How to import the book to your e-reader</h3>
      <p>Note: For <strong>Kindles only</strong> the below steps will work for pdf but not for open source epub files. To read non Amazon proprietary files on a Kindle, you must use <a target="_blank" rel="noreferrer" href="https://www.amazon.com/sendtokindle">Amazon&apos;s &quot;Send to Kindle&quot; service</a>.</p>
      <p>
        To import a book to your e-reader:
        <ol>
          <li>Plug your e-reader in to your computer with a USB cable.</li>
          <li>Go into your file explorer where the e-reader device should be listed.</li>
          <li>Download one of the files above, then drag it onto your e-reader.</li>
          <li>Safely eject your device to write to it.</li>
        </ol>
        There may also be other ways to send things to your specific device if you check online.
      </p>
    </InfoPage>
  );
}
