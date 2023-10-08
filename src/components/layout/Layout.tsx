import Footer from "@/components/layout/Footer";
import Top from "@/components/layout/Top";

export default function Layout({ children }) {
  return (
    <div
      id="main"
      className=" relative w-[375px] h-[812px] mx-auto bg-[#F0F1F4] rounded-[30px] overflow-hidden"
    >
      <div className=" h-full">
        <Top />
        <div className=" pt-[124px] px-[20px] pb-[86px] h-full">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
