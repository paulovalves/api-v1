export const converteData = (data: string | Date): Date => {
  console.log("data", data);
  const [ano, mes, dia] = data.toString().split("T")[0].split("-").map(Number);
  return new Date(ano, mes - 1, dia);
};
