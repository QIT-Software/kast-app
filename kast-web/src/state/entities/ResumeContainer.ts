import Resume from 'entities/Resume';

export default interface ResumeContainer {
  resume: Resume | undefined;
  link: string | undefined;
}
