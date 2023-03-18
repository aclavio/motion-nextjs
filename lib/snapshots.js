import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

function pad2Digit(val, padChar = '0') {
  let padded = val + '';
  while (padded.length < 2) padded = padChar + padded;
  return padded;
}

export async function getSortedSnapshotPaths() {
  const dir = process.env.SNAPSHOTS_DIR;
  const files = await readdir(dir);

  return (await Promise.all(files.map(async fileName => ({
    name: fileName,
    path: path.posix.join('/', dir, fileName),
    time: (await stat(path.join(dir, fileName))).mtime.getTime(),
  }))))
    .sort((a, b) => a.time - b.time)
    .map(snap => ({
      name: snap.name,
      path: snap.path.replace(/^\/public/, ''),
      time: snap.time
    }));
}

export async function getSortedSnapshotPathsByDay(year, month, day) {
  year = year + '';
  month = pad2Digit(month);
  day = pad2Digit(day);

  const dir = path.posix.join(process.env.SNAPSHOTS_DIR, year, month, day);

  try {
    const files = await readdir(dir);

    return (await Promise.all(files.map(async fileName => ({
      name: fileName,
      path: path.posix.join('/', dir, fileName),
      time: (await stat(path.join(dir, fileName))).mtime.getTime(),
    }))))
      .sort((a, b) => a.time - b.time)
      .map(snap => ({
        name: snap.name,
        path: snap.path.replace(/^\/public/, ''),
        time: snap.time
      }));
  } catch (err) {
    console.error('error reading files from:', dir);
    return [];
  }
}