const contacts = require("./contacts");

// const argv = require("yargs").argv;

async function invokeAction({
	action,
	// id,
	// name,
	// email,
	// phone,
}) {
	switch (action) {
		case "list":
			const result =
				await contacts.listContacts();
			console.log(result);
			break;

		case "get":
			// ... id
			break;

		case "add":
			// ... name email phone
			break;

		case "remove":
			// ... id
			break;

		default:
			console.warn(
				"\x1B[31m Unknown action type!"
			);
	}
}

// invokeAction(argv);
invokeAction({ action: "list" });
