function write_to_DB(object_to_post, type, db, callback) {
    if (!db.objectStoreNames.contains(type)) {
        let newsDb = db.createObjectStore(type, {autoIncrement: true, keyPath: type});
        newsDb.createIndex("id", "id", {unique: true})
    }
    let objects;
    if (object_to_post != null) {
        let transaction = db.transaction(type, "readwrite");
        let news = transaction.objectStore(type);
        news.add(object_to_post);
        transaction.complete;
        return undefined;
    } else {
        let transaction = db.transaction(type, "readonly");
        let os = transaction.objectStore(type);

        let cursor = os.openCursor().onsuccess = function(evt) {
            let cursor = evt.target.result;
            if (cursor) {
                let object = cursor.value;
                callback(object);
                cursor.continue()
            }
        };
    }

}
var db;
function openDataBase(object_to_post, type, callback) {
    //open a connection to the datastore
    let openRequest = indexedDB.open(type, 4);
    // handle datastore upgrades.
    openRequest.onupgradeneeded = function (event) {
        console.log("Upgrading...");
        let db = event.target.result;
        let objectStore = db.createObjectStore(type, {keyPath: "id", autoIncrement: true});
    };

    // handle successful datastore access.
    openRequest.onsuccess = function (event) {
        console.log("Success!");
        db = event.target.result;
        let result = write_to_DB(object_to_post, type, db, callback);
    };

    openRequest.onerror = function (event) {
        console.log(event.target);
    };
}