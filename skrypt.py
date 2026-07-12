import os


FILE_PRESETS = {
    "frontend": (".vue", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".scss", ".html", ".json", ".md", ".yaml", ".yml", ".mjs"),
    "backend": (".py", ".php", ".java", ".cs", ".go", ".sql"),
    "docs": (".txt", ".md", ".rst"),
    "config": (".json", ".yaml", ".yml", ".cfg", ".ini", ".toml", ".xml"),
    "scripts": (".ps1", ".sh", ".bat", ".cmd"),
}


def save_files_content_to_txt(root_folder, output_file, preset="frontend", ignore_dirs=None, ignore_files=None):
    """Zapisuje zawartość plików pasujących do wybranego presetu."""

    ignore_dirs = set(ignore_dirs or [])
    ignore_files = set(ignore_files or [])
    extensions = FILE_PRESETS[preset]

    with open(output_file, "w", encoding="utf-8") as outfile:
        for root, dirs, files in os.walk(root_folder):
            dirs[:] = [directory for directory in dirs if directory not in ignore_dirs]

            for file in files:
                if file in ignore_files or not file.endswith(extensions):
                    continue

                file_path = os.path.join(root, file)

                try:
                    with open(file_path, "r", encoding="utf-8") as infile:
                        outfile.write(f"==== {file_path} ====\n")
                        outfile.write(infile.read())
                        outfile.write("\n\n")
                except Exception as error:
                    print(f"Nie udało się odczytać pliku {file_path}: {error}")


if __name__ == "__main__":
    input_folder = "./frontend"
    output_file = "output.txt"
    preset = "frontend"
    ignore_dirs = ["node_modules", ".nuxt", ".output", ".git", "dist", "build", "logs"]
    ignore_files = ["package-lock.json", "pnpm-lock.yaml"]

    save_files_content_to_txt(input_folder, output_file, preset, ignore_dirs, ignore_files)
    print(f"Zawartość plików została zapisana do {output_file}")