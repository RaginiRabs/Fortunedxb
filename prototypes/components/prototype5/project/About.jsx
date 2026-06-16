// About the project — description only (stats live in Market Highlights to
// avoid duplication). prototype5 ONLY. Mock.
export default function About({ about }) {
  return (
    <div>
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">About the Project</h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#4B4B4B]">
        {about.description}
      </p>
    </div>
  );
}
