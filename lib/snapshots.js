import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

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