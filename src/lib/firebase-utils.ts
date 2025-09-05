import { collection, getDocs, addDoc, doc, getDoc, updateDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from './firebase';

// About content functions
export const getAboutContent = async () => {
  try {
    const docRef = doc(db, 'about_content', 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
};

// Projects functions
export const getProjects = async () => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const projects: any[] = [];
    
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Services functions
export const getServices = async () => {
  try {
    const q = query(
      collection(db, 'services'),
      where('isActive', '==', true),
      orderBy('popular', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const services: any[] = [];
    
    querySnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() });
    });
    
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Events functions
export const getEvents = async () => {
  try {
    const q = query(
      collection(db, 'events'),
      where('isActive', '==', true),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const events: any[] = [];
    
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Blog functions
export const getBlogPosts = async () => {
  try {
    const q = query(
      collection(db, 'blog_posts'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts: any[] = [];
    
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Contact message functions
export const saveContactMessage = async (messageData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...messageData,
      submittedAt: new Date(),
      status: 'unread'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, error };
  }
};

// Website request functions
export const saveWebsiteRequest = async (requestData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'website_requests'), {
      ...requestData,
      submittedAt: new Date(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving website request:', error);
    return { success: false, error };
  }
};

// Website info functions
export const getWebsiteInfo = async () => {
  try {
    const docRef = doc(db, 'website_info', 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching website info:', error);
    return null;
  }
};