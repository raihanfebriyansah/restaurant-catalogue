export const potongDeskripsi = (deskripsi, jumlahKata) => {
  const kata = deskripsi.split(' ');
  if (kata.length > jumlahKata) {
    return `${kata.slice(0, jumlahKata).join(' ')}...`;
  }
  return deskripsi;
};
