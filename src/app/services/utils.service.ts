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