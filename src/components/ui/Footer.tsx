import { Pacifico } from 'next/font/google';
import { SiYoutubemusic } from 'react-icons/si';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

const Footer = () => {
  return (
    <footer className='bg-gray-600 h-32 p-8'>
      <h4
        className={`${pacifico.className} text-white text-center text-lg mb-4 sm:text-xl`}
      >
        Follow us on
      </h4>
      <div className='flex justify-center items-center gap-3'>
        <FaFacebook size={20} color='white' />
        <SiYoutubemusic size={20} color='white' />
        <FaTwitter size={20} color='white' />
      </div>
    </footer>
  );
};

export default Footer;
