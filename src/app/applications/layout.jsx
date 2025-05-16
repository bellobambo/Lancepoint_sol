import Base from "@/components/base";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <section className=" text-black bg-gray-100">
      <Base>{children}</Base>
    </section>
  );
}
