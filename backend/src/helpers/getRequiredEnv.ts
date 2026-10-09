export default function getRequiredEnv(envVariableName: string): string {
    const envVariable = process.env[envVariableName];
    if(envVariable) {
        return envVariable;
    } else {
        throw new Error(`${envVariableName} Missing`)
    }

}