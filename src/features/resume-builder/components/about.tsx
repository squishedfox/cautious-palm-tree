import { useResumseBuilderForm } from "@app/features/resume-builder/state";

const About = () => {
  const { about, setAbout } = useResumseBuilderForm();

  return (
    <div>
      <h1 id="about-section-heading">About</h1>
      <textarea
        placeholder="1+ years of delivering data driven fatures for well tested applications using <frameworks>"
        className="w-full border border-gray-800 px-1 py-0.5"
        id="about-input"
        name="about"
        value={about}
        onChange={(event) => setAbout(event.currentTarget.value)}
        maxLength={500}
        minLength={0}
      />
      <p className="text-gray-500">
        <em>{500 - about.length} characters left</em>
      </p>
    </div>
  );
};
export default About;
