import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const documentWriteListener = functions.firestore
  .document('topics/{topicId}/comments/{commentId}')
  .onWrite((change, context) => {
    const { topicId } = context.params;

    const docRef = admin
      .firestore()
      .collection('topics')
      .doc(topicId);

    if (!change.before.exists) {
      // New document Created : add one to count
      docRef.update({
        commentCount: admin.firestore.FieldValue.increment(1),
      });
    } else if (change.before.exists && change.after.exists) {
      // Updating existing document : Do nothing
    } else if (!change.after.exists) {
      // Deleting document : subtract one from count
      docRef.update({
        commentCount: admin.firestore.FieldValue.increment(-1),
      });
    }

    return;
  });
