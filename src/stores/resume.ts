import { create } from 'zustand';
import { ResumeRequest } from '../schemas/resume';


export type ResumeBuilderStoreType = Partial<ResumeRequest> & {
  setState: (newState: Partial<ResumeRequest>) => void;
};
export const useResumeBuilder = create<ResumeBuilderStoreType>((set, get) => ({
  gender: 'male',

  setState: set,
}));
