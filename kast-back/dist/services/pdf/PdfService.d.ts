import { IPdfService } from './IPdfService';
import Resume from '../../entities/Resume';
import User from '../../entities/User';
export declare class PdfService implements IPdfService {
    createPdfResume(user: User, resume: Resume, link: string): Promise<string>;
}
