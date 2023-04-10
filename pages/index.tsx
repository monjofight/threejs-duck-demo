import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const Home = () => {
  return (
    <div>
      <h1>ページ一覧</h1>
      <ul>
        <li>
          <Link href={`/duck`}>ニワトリ</Link>
        </li>
        <li>
          <Link href={`/mofumofu`}>モフモフ</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
