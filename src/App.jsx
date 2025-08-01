import { useState } from 'react'
import './App.css'
import Toggle from './components/DarkModeToggle/toggle';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [datas, setDatas] = useState([
    {
      id: 1,
      shortLink: 'iamhim.com',
      originalLink: 'https://google.com/sosososooLooooooong',
      date: 'Oct 10 2021',
      status: 'Active',
    }
  ]);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!/^https?:\/\/.+/.test(originalUrl)) {
      alert('Please enter a valid URL that starts with http or https');
      return;
    }

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`
      );
      const shortUrl = await response.text();

      if (shortUrl.startsWith("Error")) {
        alert("TinyURL failed to shorten your link.");
        return;
      }

      const newEntry = {
        id: Date.now(),
        shortLink: shortUrl,
        originalLink: originalUrl,
        date: new Date().toDateString(),
        status: 'Active',
      };

      setDatas((prev) => [newEntry, ...prev]);
      setOriginalUrl(''); // clear input
    } catch (error) {
      alert('Something went wrong. Try again.');
      console.error(error);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Short URL copied!');
    } catch (err) {
      alert('Failed to copy code: ' + err.message);
    }
  };

  return (
    <div className='hero'>
      <div className='flex flex-col gap-4 items-center justify-center'>

        <div className='flex flex-col gap-2 items-center justify-center p-4 mt-36'>
          <h1 className='text-5xl font-bold cta'>Shorten your Loooong Links:)</h1>
          <p className='max-w-[500px] text-center text-sm mt-4'>
            Suretit is an efficient and easy-to-use URL shortening service that streamlines your online experience.
          </p>

          <form
            onSubmit={handleShorten}
            className='border-4 border-[#353C4A] p-[3px] rounded-[35px] flex gap-4 max-w-[550px] w-full'
          >
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder='Enter the link here '
              className='p-2 w-[70%] outline-0 pl-4'
            />
            <button
              type="submit"
              className='px-2 py-2 w-[30%] bg-[#144EE3] rounded-[30px] text-white cursor-pointer'
            >
              Shorten Now!
            </button>
          </form>

          <span className='flex items-center justify-center gap-2 mt-4'>
            <Toggle />
            <p>Auto paste from ClipBoard</p>
          </span>

          <p>Enjoy Your Shortend Link. Don’t Forget To Bookmark Now.</p>
        </div>

        {/* Header Row */}
        {datas.length > 0 && (
          <div className='grid grid-cols-4 w-full max-w-[700px] font-semibold'>
            <p className='text-center'>ShortLink</p>
            <p className='text-center'>Original Link</p>
            <p className='text-center'>Status</p>
            <p className='text-center'>Date</p>
          </div>
        )}


        <div>
          {/* Link Data Rows */}
          {datas.map((data) => (
            <div key={data.id} className='grid grid-cols-4 gap-4 gap-y-6 w-full max-w-[700px] text-sm items-center'>
              <div className='flex items-center justify-center gap-2'>
                <p className='text-center text-blue-600 underline cursor-pointer flex' onClick={() => handleCopy(data.shortLink)}>
                  {data.shortLink}
                                  <button
                  onClick={() => handleCopy(data.shortLink)}
                  className='text-xs text-gray-500 hover:text-black'
                >
                  📋
                </button>
                </p>
              </div>
              <p className='max-w-[200px] break-words text-center line-clamp-2'>{data.originalLink}</p>
              <p className='text-center'>{data.status}</p>
              <p className='text-center'>{data.date}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
