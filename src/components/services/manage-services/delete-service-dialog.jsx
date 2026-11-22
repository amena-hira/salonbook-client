"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteServiceDialog = ({ service, isDeleting, onOpenChange, onConfirm }) => (
  <AlertDialog open={Boolean(service)} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogMedia className="bg-red-100 text-destructive"><Trash2 /></AlertDialogMedia>
        <AlertDialogTitle>Delete service?</AlertDialogTitle>
        <AlertDialogDescription>Are you sure you want to delete {service?.name}? This action cannot be undone.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} disabled={isDeleting} className="bg-destructive text-white hover:bg-destructive/90">{isDeleting ? "Deleting..." : "Delete Service"}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteServiceDialog;
