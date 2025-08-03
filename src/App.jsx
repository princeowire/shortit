import { useState, useEffect } from 'react';
import './App.css';
import Toggle from './components/DarkModeToggle/toggle';
import copyIcon from '../src/assets/copy.svg';
import { Toaster, toast } from 'react-hot-toast'; // ✅ FIXED

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [datas, setDatas] = useState(() => {
    const stored = localStorage.getItem('shortLinks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('shortLinks', JSON.stringify(datas));
  }, [datas]);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!/^https?:\/\/.+/.test(originalUrl)) {
      toast.error('Please enter a valid URL that starts with http or https'); // ✅ FIXED
      return;
    }

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`
      );
      const shortUrl = await response.text();

      if (shortUrl.startsWith("Error")) {
        toast.error("TinyURL failed to shorten your link.");
        return;
      }

      const newEntry = {
        id: Date.now(),
        shortLink: shortUrl,
        originalLink: originalUrl,
        date: formatDateTime(new Date()),
        status: 'Active',
      };

      setDatas((prev) => [newEntry, ...prev]);
      setOriginalUrl('');
      toast.success('Link shortened successfully!'); // ✅ OPTIONAL
    } catch (error) {
      toast.error('Something went wrong. Try again.');
      console.error(error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!/^https?:\/\/.+/.test(text)) {
        toast.error("Clipboard doesn't contain a valid URL.");
        return;
      }
      setOriginalUrl(text);
    } catch (err) {
      toast.error("Failed to read clipboard: " + err.message);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Short URL copied!'); // ✅ FIXED TYPO
    } catch (err) {
      toast.error('Failed to copy: ' + err.message);
    }
  };

  const handleDelete = (id) => {
    const updated = datas.filter((item) => item.id !== id);
    setDatas(updated);
  };

  const formatDateTime = (date) => {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHour = String(hours % 12 || 12).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2);

  return `${formattedHour}:${minutes}${ampm}, ${day}/${month}/${year}`;
};


  return (
    <div className="hero">
      <Toaster position="top-right" /> {/* ✅ ENSURES TOAST IS VISIBLE */}
      <div className="flex flex-col gap-4 items-center justify-center">

        <div className="flex flex-col gap-2 items-center justify-center p-4 mt-20">
          <h1 className="text-5xl font-bold cta text-center">Shorten your Loooong Links :)</h1>
          <p className="max-w-[500px] text-center text-sm mt-4">
            Shortit is an efficient and easy-to-use URL shortening service that streamlines your online experience.
          </p>

          <form
            onSubmit={handleShorten}
            className="border-4 border-[#353C4A] p-[3px] rounded-[35px] flex max-w-[550px] w-full"
          >
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter the link here"
              className="p-2 w-[70%] outline-0 pl-4"
            />
            <button
              type="submit"
              className="px-2 py-2 w-[30%] bg-[#144EE3] rounded-[30px] text-white cursor-pointer"
            >
              Shorten Now!
            </button>
          </form>

          <span className="flex items-center justify-center gap-2 mt-4">
            <Toggle handlePaste={handlePaste} />
            <p>Auto paste from Clipboard</p>
          </span>

          <p className='text-center'>Enjoy Your Shortened Link. Don’t Forget To Bookmark Now.</p>
        </div>

        <div className="space-y-2 p-4">
          <div className="grid grid-cols-5 w-full gap-x-10 max-w-[700px] font-semibold bg-[#4a515e40] backdrop-blur-[10px] rounded-t-2xl p-4 max-sm:text-sm">
            <p className="text-center">ShortLink</p>
            <p className="text-center">Original Link</p>
            <p className="text-center">Status</p>
            <p className="text-center">Date</p>
            <p className="text-center">Delete</p>
          </div>

          <div className="scroll-history overflow-y-scroll max-h-[200px] max-sm:max-h-[300px] w-full max-w-[700px] bg-[#4a515e40] backdrop-blur-[10px] rounded-b-2xl p-4">
            {datas.map((data) => (
              <div
                key={data.id}
                className="grid grid-cols-5 gap-4 gap-y-6 w-full max-w-[700px] text-sm items-center justify-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <p
                    className="text-center text-blue-600 underline w-[80%] cursor-pointer flex items-center truncate"
                    onClick={() => handleCopy(data.shortLink)}
                  >
                    {data.shortLink}
                  </p>
                  <button
                    onClick={() => handleCopy(data.shortLink)}
                    className="text-xs text-gray-500 hover:text-black cursor-pointer"
                  >
                    <img src={copyIcon} alt="Copy" />
                  </button>
                </div>
                <p className="max-w-[200px] break-words text-center line-clamp-2">{data.originalLink}</p>
                <p className="text-center">{data.status}</p>
                <p className="text-center">{data.date}</p>
                <button
                  onClick={() => handleDelete(data.id)}
                  className="text-red-500 text-xs hover:underline text-center"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
