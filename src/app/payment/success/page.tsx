import Link from 'next/link';

const PaymentSuccessPage = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-green-500 text-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-4'>Payment Successful!</h2>
        <p className='text-lg mb-4'>
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          <Link href='/'>Return to Home</Link>
        </button>
      </div>
    </section>
  );
};

export default PaymentSuccessPage;
