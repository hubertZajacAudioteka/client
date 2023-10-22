const OrderFailurePage = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-red-500 text-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-4'>Order Failed</h2>
        <p className='text-lg mb-4'>
          Sorry, there was an issue processing your order. Please try again
          later.
        </p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          <a href='/'>Return to Home</a>
        </button>
      </div>
    </section>
  );
};

export default OrderFailurePage;
