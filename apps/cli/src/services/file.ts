import { Singleton } from "@snail/utils";
import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
import { HOME } from "../utils";

export abstract class AbstractFileService extends Singleton {
	async readJson<T extends Record<string, any>>(path: string) {
		return JSON.parse(await this.readFile(path)) as T;
	}

	async upsertJson<T extends Record<string, any>>(path: string, data: T) {
		try {
			return await this.writeFile(
				path,
				JSON.stringify({
					...(await this.readJson(path)),
					...data,
				}),
			);
		} catch {
			return await this.writeFile(path, JSON.stringify(data));
		}
	}

	protected async writeFile(path: string, data: string) {
		const filePath = this.getPath(path);
		const folderPath = filePath.slice(0, filePath.lastIndexOf("/"));

		await mkdir(folderPath, { recursive: true });

		return await writeFile(filePath, data);
	}

	protected readFile(path: string) {
		return readFile(this.getPath(path), "utf-8");
	}

	protected async readDir(path: string) {
		try {
			return await readdir(this.getPath(path));
		} catch {
			return [];
		}
	}

	protected deleteFile(path: string) {
		return rm(this.getPath(path), { force: true, recursive: true });
	}

	protected getPath(path: string) {
		return path.replace("~", HOME);
	}
}
