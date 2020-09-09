export default function parseStringAsArray(arrayAsString: any) {
  return arrayAsString.split(",").map((tech: string) => tech.trim());
}
