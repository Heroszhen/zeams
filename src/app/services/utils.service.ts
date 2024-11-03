export function wait(seconds:number): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, seconds * 1000);
  });
}

export function readFile(file:File): Promise<string> {
  return new Promise((resolve,err) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result as string);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * 
 * @param {Array<Object>} tab 
 * @param {('asc' | 'desc')} order 
 * @returns {Array<Object>}
 */
export function sortArrayByCreated <T extends {created: string}> (tab:T[], order:string): Array<T> {
  return tab.sort((current:T, next:T) => {
    if (order === 'asc') return new Date(current.created).getTime() - new Date(next.created).getTime();
    else return new Date(next.created).getTime() - new Date(current.created).getTime();
  });
}