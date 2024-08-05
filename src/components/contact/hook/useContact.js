import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  addDoc,
  collection,
  query,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../firebase/auth";
import { contactSchema } from "../schema/contactSchema";
import { useToastMessages } from "@/components/message/useToastMessages";
import { db } from "../../../../firebase/firebase";

export const useContact = () => {
  const params = useParams();
  const router = useRouter();
  const { authUser } = useAuth();
  const { Success, Warn } = useToastMessages();
  const [allItems, setItems] = useState([]);
  const [itemUp, setItem] = useState([]);

  useEffect(() => {
    if (!!authUser) {
      handleFetch(authUser.email);
    }
  }, [authUser]);

  useEffect(() => {
    if (params.contact) {
      handleFetchItem(params.contact);
    } else {
      setItem({});
    }
  }, [params.contact]);

  const handleFetchItem = async (itemId) => {
    try {
      const docRef = doc(db, "items", itemId);
      const querySnapshot = await getDoc(docRef);
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        setItem(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    itemName: itemUp && itemUp.itemName ? itemUp.itemName : "",
    quantity: itemUp && itemUp.quantity ? itemUp.quantity : 1,
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      Success("Item successfully deleted!");
      await handleFetch(authUser.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetch = async (email) => {
    try {
      const q = query(collection(db, "items"));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { itemName, quantity } = values;
    try {
      if (params.contact !== undefined && params.contact !== "") {
        const docRef = doc(db, "items", params.contact);
        await updateDoc(docRef, values);
        router.push("/contact");
      } else {
        await addDoc(collection(db, "items"), {
          itemName: itemName,
          quantity: quantity,
        });
      }
      Success("Item successfully added!");
      handleFetch();
    } catch (error) {
      console.error(error);
      Warn("Something went wrong!");
    }
    resetForm();
  };

  return {
    initialValues,
    schema: contactSchema,
    handleSubmit,
    handleDelete,
    allItems,
  };
};
