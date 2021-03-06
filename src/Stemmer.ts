export default class Stemmer {
  private static regexemr = /e[mr]$/;
  private static regexnd = /nd$/;
  private static regext = /t$/;
  private static regexesn = /[esn]$/;

  static stem(word: string, caseInsensitive: boolean = true): string {
    if (word.length === 0) {
      return '';
    }

    let uppercase = word[0] === word[0].toUpperCase();
    let stem = word.toLowerCase();

    stem = stem
      .replace('ä', 'a')
      .replace('ö', 'o')
      .replace('ü', 'u')
      .replace('ß', 'ss');

    stem = stem
      .replace(/^ge(.{4,})/, '$1')
      .replace(/sch/, '$$')
      .replace(/ei/, '%')
      .replace(/ie/, '&')
      .replace(/(.)\1/, '$1*');

    while(stem.length > 3) {
      if(stem.length > 5) {
        if(stem.search(Stemmer.regexemr) !== -1) {
          stem = stem.replace(Stemmer.regexemr, '');
          continue;
        }

        if(stem.search(Stemmer.regexnd) !== -1) {
          stem = stem.replace(Stemmer.regexnd, '');
          continue;
        }
      }

      if(!uppercase || caseInsensitive) {
        if(stem.search(Stemmer.regext) !== -1) {
          stem = stem.replace(Stemmer.regext, '');
          continue;
        }
      }

      if(stem.search(Stemmer.regexesn) !== -1) {
        stem = stem.replace(Stemmer.regexesn, '');
        continue;
      }

      break;
    }

    stem = stem
      .replace(/(.)\*/, '$1$1')
      .replace(/%/, 'ei')
      .replace(/&/, 'ie')
      .replace(/\$/, 'sch');

    return stem;
  }
}
