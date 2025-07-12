import * as bcrypt from 'bcrypt';


export class BcryptUtil {
    private static readonly saltRounds = 10;

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}