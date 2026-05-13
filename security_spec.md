# Security Specification for CROWN & CANVAS

## Data Invariants
1. An image cannot exist without an owner ID.
2. The owner ID in the document must match the authenticated user's UID.
3. Timestamps and metadata must be consistent with the user's input.
4. Users can only edit or delete their own images.
5. In this version, we will allow anyone to view the gallery (public read) but only owners to write. Or actually, let's keep it private to the user for "Private Gallery" feel, as requested.

## The Dirty Dozen Payloads (Targeting `/images/{imageId}`)

1. **Identity Spoofing**: Creating an image with `ownerId: "someone_else"`.
2. **Ghost Write**: Writing to `/images/someId` without being authenticated.
3. **Shadow Field**: Adding `isPromoted: true` to an image document.
4. **ID Poisoning**: Using a 2KB string as a document ID.
5. **PII Leak**: (Not applicable here yet, but good to watch).
6. **State Shortcut**: (Not applicable).
7. **Resource Poisoning**: Uploading a 2MB base64 string in the `title` field.
8. **Unauthorized Update**: User A trying to change the title of User B's image.
9. **Unauthorized Delete**: User A trying to remove User B's image.
10. **Type Mismatch**: Setting `rotation` to a string "90deg".
11. **Timestamp Spoofing**: Setting `createdAt` to a date in the future instead of `request.time`.
12. **Enum Bypassing**: Setting `category` to "Illegal category".

## The Test Runner
(I will implement tests in `firestore.rules.test.ts` later if needed, but for now I will focus on the rules).
