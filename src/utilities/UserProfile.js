import { child, get, ref, set } from "firebase/database";

import { database } from "./Firebase";

const createUserProfileIfMissing = async (user, overrides = {}) => {
  if (!user?.uid) return;

  const userId = user.uid;
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `Users/${userId}/UserInfo`));

  if (!snapshot.exists()) {
    const displayName = user.displayName || "";
    const nameParts = displayName.trim().split(" ");
    const fullNames = overrides.fullNames || nameParts.slice(0, -1).join(" ") || displayName || "";
    const surname = overrides.surname || nameParts.slice(-1).join("") || "";

    await set(ref(database, `Users/${userId}/UserInfo`), {
      fullNames,
      surname,
      idOrPassportNumber: overrides.idOrPassportNumber || "",
      companyName: overrides.companyName || "",
      email: user.email || overrides.email || "",
      phoneNumber: user.phoneNumber || overrides.phoneNumber || "",
      isManager: false,
    });
  }
};

export default createUserProfileIfMissing;
