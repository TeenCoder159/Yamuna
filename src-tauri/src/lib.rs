// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#![allow(unused)]

#[tauri::command]
fn command(command: &str) -> String {
    let mut command_args: Vec<String> = Vec::new();

    let mut i = 0;

    for arg in command.split_whitespace() {}

    String::new()
}

#[tauri::command]
fn contents(file: &str) -> String {
    match std::fs::read_to_string(file) {
        Ok(a) => return a,
        Err(err) => return String::from("An error occured while loading the file"),
    }
}

#[tauri::command]
fn files(dir: &str) -> Vec<String> {
    let mut content_in_dir: Vec<String> = Vec::new();
    for entry in std::fs::read_dir(dir).expect("Error while trying to read directory") {
        content_in_dir.push(
            entry
                .expect("Error while trying to get path")
                .path()
                .to_str()
                .unwrap_or("ERROR")
                .to_string(),
        );
    }
    content_in_dir
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![command])
        .invoke_handler(tauri::generate_handler![contents])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
