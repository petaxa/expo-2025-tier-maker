export default (fullTitle: string): string => {
  return fullTitle.split(/[ （※]/)[0]
};
