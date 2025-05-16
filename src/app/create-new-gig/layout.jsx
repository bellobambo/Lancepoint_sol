import Base from "@/components/base";

export default function NewJobLayout({ children }) {
  return (
    <section className=" text-black bg-gray-100">
      <Base>{children}</Base>
    </section>
  );
}
