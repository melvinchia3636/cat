/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

export interface Status {
  verified: boolean;
  sentCount: number;
}

export interface FactsData {
  status: Status;
  _id: string;
  updatedAt: string;
  createdAt: string;
  user: string;
  text: string;
  deleted: boolean;
  source: string;
  __v: number;
  type: string;
  used: boolean;
}

function App() {
  const [fact, setFact] = useState<FactsData>();
  const [isReloadToggled, setReloadToggled] = useState(true);
  const [theme, setTheme] = React.useState(localStorage.theme);

  React.useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  const fetchData = () => {
    setReloadToggled(true);
    setTimeout(() => fetch('https://cat-fact.herokuapp.com/facts/random?amount=1')
      .then((res) => res.json())
      .then((data: FactsData) => { setFact(data); setReloadToggled(false); }), 600);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const download = () => {
    html2canvas(document.querySelector('.fact') as never).then((cv) => {
      const imageData = cv.toDataURL('image/png');
      const newData = imageData?.replace(/^data:image\/png/, 'data:application/octet-stream');
      const downloadBtn: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      downloadBtn.download = 'cat-fact.png';
      downloadBtn.href = newData || '';
      downloadBtn.click();
    });
  };

  return (
    <main className="min-w-0 min-h-0 w-full overflow-hidden relative bg-yellow-500 dark:bg-yellow-700 flex items-center justify-center">
      <script src="bower_components/react-motion/build/react-motion.js" />
      <div className="h-full min-w-0 shadow-2xl w-full mx-3 md:mx-24 lg:mx-32 bg-zinc-100 dark:bg-zinc-700 pb-0 flex flex-col">
        <Navbar setTheme={setTheme} theme={theme} />
        <div className="w-full h-full overflow-scroll flex pb-12 flex-col text-2xl items-center text-zinc-700 dark:text-white">
          <div className="flex items-center my-auto flex-col fact py-6 bg-zinc-100 dark:bg-zinc-700 px-12">
            <Icon icon="teenyicons:paw-outline" className="w-8 h-8 mb-4 text-yellow-500" />
            <motion.p
              animate={{
                opacity: !isReloadToggled ? 1 : 0,
                maxHeight: !isReloadToggled ? 2400 : 0,
              }}
              transition={{ ease: 'easeOut', duration: 0.6 }}
              initial={false}
              className="text-center"
            >
              {fact?.text}
            </motion.p>
            {fact?.createdAt && <p className="text-yellow-500 text-base font-semibold mt-4">{new Date(fact?.createdAt || '').toLocaleString()}</p>}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={fetchData} className="p-4 bg-zinc-200 dark:bg-zinc-600 rounded-md shadow-md">
              <Icon icon="eva:refresh-outline" className="text-zinc-700 dark:text-zinc-100" />
            </button>
            <button type="button" onClick={download} className="p-4 bg-yellow-500 rounded-md shadow-md">
              <Icon icon="eva:save-outline" className="text-zinc-100" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
