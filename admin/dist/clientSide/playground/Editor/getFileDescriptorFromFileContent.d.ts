export default function getFileDescriptorFromFileContent(fileContent: any): {
    type: string;
    filePath: string;
    description: any;
} | undefined;
