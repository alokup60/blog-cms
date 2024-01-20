<script>
  import mobImg from "$lib/images/mobile-Img.svg";
  import bCoin from "$lib/images/bCoin .svg";
  import sCoin from "$lib/images/smallCoin.svg";
  import cover from "$lib/images/girl-img.svg";
  import first from "$lib/images/firstBar.svg";
  import sec from "$lib/images/secbar.svg";
  import third from "$lib/images/third.svg";
  import rightF from "$lib/images/rightF.svg";
  import rightS from "$lib/images/rightSec.svg";
</script>

<section
  class="w-10/12 flex justify-between mx-auto items-center relative mt-[3rem]"
>
  <div class="w-6/12 leading-tight">
    <p class="text-[#20395C] font-bold text-[20px] tracking-wider">
      BUDGET CONFIDENTLY
    </p>
    <p class="text-[#20395C] text-[60px] tracking-wide">The only app that</p>
    <p class="text-[#20395C] text-[60px] tracking-wide font-semibold z-1">
      gets your money into shape
    </p>

    <div class="w-8/12 mt-4 tracking-widest">
      <p class="text-[#526A8B]">
        Stop living paycheck-to-paycheck, get out of debt, and save more money
      </p>
    </div>

    <div class="flex justify-between mx-auto items-center mt-[4rem]">
      <button
        class="bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500 py-4 px-[5rem] rounded-[50px] font-semibold text-white hover:from-red-500 transition-all duration-100"
        >PAY</button
      >
      <div
        class="flex gap-4 items-center text-[#20395C] tracking-wider hover:text-red-500"
      >
        <a href="#" class="">SIGN UP FREE</a>
        <span><i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
    <div class="absolute top-[4rem] left-[25rem] z-[-1]">
      <img src={third} alt="thirdBar" width="70px" />
    </div>
    <div class="absolute top-[10em] left-[16rem] z-[-1]">
      <img src={sec} alt="thirdBar" width="70px" />
    </div>
    <div class="absolute top-[15rem] left-[6rem] z-[-1]">
      <img src={first} alt="thirdBar" width="70px" />
    </div>
  </div>

  <div class="w-5/12">
    <div class="absolute -top-5 right-[-6rem] overflow-hidden z-2">
      <img src={cover} alt="cover" width="350px" />
    </div>
    <div class="absolute top-[11rem] right-[10rem]">
      <img src={mobImg} alt="mobile" class="z-1 w-[150px]" />
    </div>
    <div class="absolute top-0 right-[-6rem] z-[-1]">
      <img src={bCoin} alt="BCoin" />
    </div>
    <div class="absolute top-0 right-[20rem] z-[1]">
      <img src={sCoin} alt="sCoin" />
    </div>
    <div class="absolute top-0 right-[12rem] z-[1]">
      <img src={sCoin} alt="sCoin" width="80px" />
    </div>
    <div class="absolute top-0 right-[25rem] z-[-1]">
      <img src={rightF} alt="thirdBar" width="70px" />
    </div>
    <div class="absolute top-0 right-[12rem] z-[-1]">
      <img src={rightF} alt="thirdBar" width="70px" />
    </div>
  </div>
</section>
