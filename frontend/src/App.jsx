
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login / registration form state
  const [authMode, setAuthMode] = useState('login');
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: '',
    graduationYear: '',
    company: '',
    skills: '',
  });

  // BFS connection path state
  const [targetUserId, setTargetUserId] = useState('');
  const [connectionPath, setConnectionPath] = useState(null);

  // DFS connection traversal state
  const [dfsResult, setDfsResult] = useState(null);
  const [dfsLoading, setDfsLoading] = useState(false);
  const [dfsMessage, setDfsMessage] = useState('');

  // Dijkstra lowest-cost suggested path state
  const [dijkstraResult, setDijkstraResult] = useState(null);
  const [dijkstraLoading, setDijkstraLoading] = useState(false);
  const [dijkstraMessage, setDijkstraMessage] = useState('');

  // Bellman-Ford connection path state
  const [bellmanFordResult, setBellmanFordResult] = useState(null);
  const [bellmanFordLoading, setBellmanFordLoading] = useState(false);
  const [bellmanFordMessage, setBellmanFordMessage] = useState('');

  // Floyd-Warshall all-pairs connection path state
  const [floydWarshallResult, setFloydWarshallResult] = useState(null);
  const [floydWarshallLoading, setFloydWarshallLoading] = useState(false);
  const [floydWarshallMessage, setFloydWarshallMessage] = useState('');
    // Hamiltonian Cycle state
  const [hamiltonianResult, setHamiltonianResult] = useState(null);
  const [hamiltonianLoading, setHamiltonianLoading] = useState(false);
  const [hamiltonianMessage, setHamiltonianMessage] = useState('');

  // Graph Coloring state
  const [graphColoringResult, setGraphColoringResult] = useState(null);
  const [graphColoringLoading, setGraphColoringLoading] = useState(false);
  const [graphColoringMessage, setGraphColoringMessage] = useState('');

  // Sum of Subsets state
  const [subsetNumbers, setSubsetNumbers] = useState('2, 3, 5, 7');
  const [subsetTarget, setSubsetTarget] = useState('10');
  const [sumOfSubsetsResult, setSumOfSubsetsResult] = useState(null);
  const [sumOfSubsetsLoading, setSumOfSubsetsLoading] = useState(false);
  const [sumOfSubsetsMessage, setSumOfSubsetsMessage] = useState('');

  // Travelling Salesman Problem state
  const [tspMatrix, setTspMatrix] = useState('[[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]');
  const [tspResult, setTspResult] = useState(null);
  const [tspLoading, setTspLoading] = useState(false);
  const [tspMessage, setTspMessage] = useState('');

  // Matrix Chain Multiplication state
  const [matrixDimensions, setMatrixDimensions] = useState('10, 30, 5, 60');
  const [matrixChainResult, setMatrixChainResult] = useState(null);
  const [matrixChainLoading, setMatrixChainLoading] = useState(false);
  const [matrixChainMessage, setMatrixChainMessage] = useState('');

  // Connected Components state
  const [componentsResult, setComponentsResult] = useState(null);
  const [componentsLoading, setComponentsLoading] = useState(false);
  const [componentsMessage, setComponentsMessage] = useState('');

  // Kruskal minimum spanning tree state
  const [kruskalResult, setKruskalResult] = useState(null);
  const [kruskalLoading, setKruskalLoading] = useState(false);
  const [kruskalMessage, setKruskalMessage] = useState('');

  // Knapsack career recommendation state
  const [careerRecommendations, setCareerRecommendations] = useState(null);
  const [careerRecommendationsLoading, setCareerRecommendationsLoading] = useState(false);
  const [careerRecommendationsMessage, setCareerRecommendationsMessage] = useState('');


  // Mentoring session resource allocation state
  const [resourceAllocationResult, setResourceAllocationResult] = useState(null);
  const [resourceAllocationLoading, setResourceAllocationLoading] = useState(false);
  const [resourceAllocationMessage, setResourceAllocationMessage] = useState('');

  // LCS skills comparison state
  const [skillsComparison, setSkillsComparison] = useState(null);
  const [skillsComparisonLoading, setSkillsComparisonLoading] = useState(false);
  const [skillsComparisonMessage, setSkillsComparisonMessage] = useState('');

  // Alumni directory state
  const [alumni, setAlumni] = useState([]);
  const [filters, setFilters] = useState({
    department: '',
    graduationYear: '',
    company: '',
    skills: '',
  });

  const [alumniLoading, setAlumniLoading] = useState(false);
  const [alumniMessage, setAlumniMessage] = useState('');
  const [hasSearchedAlumni, setHasSearchedAlumni] = useState(false);
  const [connectionRequestMessages, setConnectionRequestMessages] = useState({});
  const [requestingUserId, setRequestingUserId] = useState('');

  // Sent connection requests
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');
  const [hasLoadedPendingRequests, setHasLoadedPendingRequests] = useState(false);
  const [cancellingRequestId, setCancellingRequestId] = useState('');

  // Incoming connection requests
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [incomingLoading, setIncomingLoading] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState('');
  const [hasLoadedIncomingRequests, setHasLoadedIncomingRequests] = useState(false);
  const [acceptingRequestId, setAcceptingRequestId] = useState('');

  // Accepted connections
  const [connections, setConnections] = useState([]);
  const [connectionsLoading, setConnectionsLoading] = useState(false);
  const [connectionsMessage, setConnectionsMessage] = useState('');
  const [hasLoadedConnections, setHasLoadedConnections] = useState(false);
    // Alumni Red-Black Tree state
  const [alumniTree, setAlumniTree] = useState([]);
  const [alumniTreeLoading, setAlumniTreeLoading] = useState(false);
  const [alumniTreeMessage, setAlumniTreeMessage] = useState('');
  const [hasLoadedAlumniTree, setHasLoadedAlumniTree] = useState(false);

  // General and BFS messages
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');

    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  };

  // Handle alumni filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  // Fetch alumni only when the user submits the search form
  const fetchAlumni = async (activeFilters) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setAlumniMessage('Please log in again to view the alumni directory.');
      return;
    }

    try {
      setAlumniLoading(true);
      setAlumniMessage('');

      const params = {};

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value.trim()) {
          params[key] = value.trim();
        }
      });

      const response = await axios.get(`${API_URL}/alumni`, {
        headers: getAuthHeaders(),
        params,
      });

      setAlumni(response.data.alumni || []);
      setAlumniMessage(
        `Found ${response.data.count} alumni matching your search.`
      );
      setHasSearchedAlumni(true);
    } catch (error) {
      setAlumni([]);
      setHasSearchedAlumni(true);
      setAlumniMessage(
        error.response?.data?.message ||
          'Unable to load the alumni directory.'
      );
    } finally {
      setAlumniLoading(false);
    }
  };

  // Login
  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setUser(response.data.user);
      setPassword('');
      setMessage('Login successful!');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Login failed. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Update registration form fields
  const handleRegisterFieldChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((current) => ({ ...current, [name]: value }));
  };

  // Register a new student or alumnus
  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const payload = {
        name: registerForm.name.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        role: registerForm.role,
        department: registerForm.department.trim(),
        graduationYear: registerForm.graduationYear
          ? Number(registerForm.graduationYear)
          : undefined,
        company: registerForm.company.trim(),
        skills: registerForm.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await axios.post(`${API_URL}/auth/register`, payload);

      setEmail(payload.email);
      setPassword('');
      setRegisterForm({
        name: '',
        email: '',
        password: '',
        role: 'student',
        department: '',
        graduationYear: '',
        company: '',
        skills: '',
      });

      setAuthMode('login');
      setMessage(
        'Account created successfully. Please log in with your new account.'
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Registration failed. Please check the details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Send a connection request to an alumnus
  const sendConnectionRequest = async (alumnusId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setConnectionRequestMessages((current) => ({
        ...current,
        [alumnusId]: 'Please log in again to send a connection request.',
      }));
      return;
    }

    if (String(user?._id || '') === String(alumnusId)) {
      setConnectionRequestMessages((current) => ({
        ...current,
        [alumnusId]: 'You cannot send a connection request to yourself.',
      }));
      return;
    }

    try {
      setRequestingUserId(alumnusId);

      setConnectionRequestMessages((current) => ({
        ...current,
        [alumnusId]: '',
      }));

      const response = await axios.post(
        `${API_URL}/connections/request`,
        { userId: alumnusId },
        { headers: getAuthHeaders() }
      );

      setConnectionRequestMessages((current) => ({
        ...current,
        [alumnusId]:
          response.data.message || 'Connection request sent successfully.',
      }));

      if (hasLoadedPendingRequests) {
        await fetchPendingRequests();
      }
    } catch (error) {
      setConnectionRequestMessages((current) => ({
        ...current,
        [alumnusId]:
          error.response?.data?.message ||
          'Unable to send the connection request. Please try again.',
      }));
    } finally {
      setRequestingUserId('');
    }
  };

  // Load requests sent by the logged-in user
  const fetchPendingRequests = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setPendingRequests([]);
      setPendingMessage('Please log in again to view pending requests.');
      setHasLoadedPendingRequests(true);
      return;
    }

    try {
      setPendingLoading(true);
      setPendingMessage('');

      const response = await axios.get(`${API_URL}/connections/pending`, {
        headers: getAuthHeaders(),
      });

      const requestList = Array.isArray(response.data.requests)
        ? response.data.requests
        : [];

      setPendingRequests(requestList);
      setHasLoadedPendingRequests(true);
      setPendingMessage(
        `Found ${response.data.count ?? requestList.length} pending request(s).`
      );
    } catch (error) {
      setPendingRequests([]);
      setHasLoadedPendingRequests(true);
      setPendingMessage(
        error.response?.data?.message ||
          'Unable to load pending requests. Please try again.'
      );
    } finally {
      setPendingLoading(false);
    }
  };

  // Load requests received by the logged-in user
  const fetchIncomingRequests = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIncomingRequests([]);
      setIncomingMessage('Please log in again to view incoming requests.');
      setHasLoadedIncomingRequests(true);
      return;
    }

    try {
      setIncomingLoading(true);
      setIncomingMessage('');

      const response = await axios.get(`${API_URL}/connections/incoming`, {
        headers: getAuthHeaders(),
      });

      const requestList = Array.isArray(response.data.requests)
        ? response.data.requests
        : [];

      setIncomingRequests(requestList);
      setHasLoadedIncomingRequests(true);
      setIncomingMessage(
        `Found ${response.data.count ?? requestList.length} incoming request(s).`
      );
    } catch (error) {
      setIncomingRequests([]);
      setHasLoadedIncomingRequests(true);
      setIncomingMessage(
        error.response?.data?.message ||
          'Unable to load incoming requests. Please check the backend route.'
      );
    } finally {
      setIncomingLoading(false);
    }
  };

  // Accept a request received from a student
  const acceptIncomingRequest = async (connectionId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIncomingMessage('Please log in again to accept this request.');
      return;
    }

    try {
      setAcceptingRequestId(connectionId);
      setIncomingMessage('');

      const response = await axios.put(
        `${API_URL}/connections/${connectionId}/accept`,
        {},
        { headers: getAuthHeaders() }
      );

      setIncomingRequests((currentRequests) =>
        currentRequests.filter((request) => request._id !== connectionId)
      );

      setIncomingMessage(
        response.data.message || 'Connection request accepted successfully.'
      );

      // Refresh accepted connections if they have already been loaded.
      if (hasLoadedConnections) {
        await fetchConnections();
      }

      // Refresh sent requests if they have already been loaded.
      if (hasLoadedPendingRequests) {
        await fetchPendingRequests();
      }
    } catch (error) {
      setIncomingMessage(
        error.response?.data?.message ||
          'Unable to accept the connection request. Please try again.'
      );
    } finally {
      setAcceptingRequestId('');
    }
  };

  // Cancel a pending request sent by the logged-in user
  const cancelPendingRequest = async (connectionId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setPendingMessage('Please log in again to cancel a request.');
      return;
    }

    try {
      setCancellingRequestId(connectionId);
      setPendingMessage('');

      const response = await axios.delete(
        `${API_URL}/connections/${connectionId}/cancel`,
        { headers: getAuthHeaders() }
      );

      setPendingRequests((currentRequests) =>
        currentRequests.filter((request) => request._id !== connectionId)
      );

      setPendingMessage(
        response.data.message || 'Connection request cancelled successfully.'
      );

      setConnectionRequestMessages((current) => {
        const updated = { ...current };

        const cancelledRequest = pendingRequests.find(
          (request) => request._id === connectionId
        );

        const recipientId = cancelledRequest?.user2?._id;

        if (recipientId) {
          updated[recipientId] = 'Connection request cancelled.';
        }

        return updated;
      });
    } catch (error) {
      setPendingMessage(
        error.response?.data?.message ||
          'Unable to cancel the connection request. Please try again.'
      );
    } finally {
      setCancellingRequestId('');
    }
  };

  // Load accepted connections
  const fetchConnections = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setConnections([]);
      setConnectionsMessage('Please log in again to view your connections.');
      setHasLoadedConnections(true);
      return;
    }

    try {
      setConnectionsLoading(true);
      setConnectionsMessage('');

      const response = await axios.get(`${API_URL}/connections`, {
        headers: getAuthHeaders(),
      });

      const connectionList = Array.isArray(response.data.connections)
        ? response.data.connections
        : [];

      setConnections(connectionList);
      setHasLoadedConnections(true);

      setConnectionsMessage(
        `Found ${response.data.count ?? connectionList.length} connection(s).`
      );
    } catch (error) {
      setConnections([]);
      setHasLoadedConnections(true);
      setConnectionsMessage(
        error.response?.data?.message ||
          'Unable to load your connections. Please try again.'
      );
    } finally {
      setConnectionsLoading(false);
    }
  };
    // Load the alumni graduation-year Red-Black Tree
  const fetchAlumniTree = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setAlumniTree([]);
      setAlumniTreeMessage('Please log in again to view the alumni tree.');
      setHasLoadedAlumniTree(true);
      return;
    }

    try {
      setAlumniTreeLoading(true);
      setAlumniTreeMessage('');

      const response = await axios.get(
        `${API_URL}/algorithms/alumni-red-black-tree`,
        { headers: getAuthHeaders() }
      );

      const entries = Array.isArray(response.data.entries)
        ? response.data.entries
        : [];

      setAlumniTree(entries);
      setHasLoadedAlumniTree(true);

      setAlumniTreeMessage(
        `${response.data.totalAlumni} alumni organized across ${response.data.totalGraduationYears} graduation year(s).`
      );
    } catch (error) {
      setAlumniTree([]);
      setHasLoadedAlumniTree(true);

      setAlumniTreeMessage(
        error.response?.data?.message ||
          'Unable to load the alumni graduation-year tree.'
      );
    } finally {
      setAlumniTreeLoading(false);
    }
  };

  // Find the shortest connection path using BFS

  const findConnectionPath = async (event) => {
    event.preventDefault();

    setConnectionPath(null);
    setMessage('');

    if (!targetUserId.trim()) {
      setMessage('Please enter an alumnus user ID.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      setMessage('Please log in again to continue.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/connections/path/${encodeURIComponent(targetUserId.trim())}`,
        { headers: getAuthHeaders() }
      );

      setConnectionPath(response.data);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setUser(null);
        setMessage('Your session has expired. Please log in again.');
      } else {
        setMessage(
          error.response?.data?.message ||
            'Unable to find the connection path. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };
  // Explore an alumni connection path using Depth-First Search (DFS)
  const findDfsPath = async () => {
    if (!targetUserId.trim()) {
      setDfsResult(null);
      setDfsMessage('Please select an alumnus or enter a user ID first.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setDfsResult(null);
      setDfsMessage('Please log in again to continue.');
      return;
    }

    try {
      setDfsLoading(true);
      setDfsResult(null);
      setDfsMessage('');

      const response = await axios.get(
        `${API_URL}/connections/dfs/${encodeURIComponent(targetUserId.trim())}`,
        { headers: getAuthHeaders() }
      );

      setDfsResult(response.data);
      setDfsMessage(response.data.message || 'DFS connection traversal completed.');
    } catch (error) {
      setDfsResult(null);
      setDfsMessage(
        error.response?.data?.message ||
          'Unable to explore the connection path using DFS.'
      );
    } finally {
      setDfsLoading(false);
    }
  };

    // Find the lowest-cost suggested networking path using Dijkstra
  const findDijkstraPath = async () => {
    if (!targetUserId.trim()) {
      setDijkstraResult(null);
      setDijkstraMessage('Please select an alumnus or enter a user ID first.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setDijkstraResult(null);
      setDijkstraMessage('Please log in again to continue.');
      return;
    }

    try {
      setDijkstraLoading(true);
      setDijkstraResult(null);
      setDijkstraMessage('');

      const response = await axios.get(
        `${API_URL}/connections/dijkstra/${encodeURIComponent(targetUserId.trim())}`,
        { headers: getAuthHeaders() }
      );

      setDijkstraResult(response.data);
      setDijkstraMessage(
        response.data.message || 'Suggested networking path found.'
      );
    } catch (error) {
      setDijkstraResult(null);
      setDijkstraMessage(
        error.response?.data?.message ||
          'Unable to calculate the suggested networking path.'
      );
    } finally {
      setDijkstraLoading(false);
    }
  };

  // Find a connection path using the Bellman-Ford algorithm
  const findBellmanFordPath = async () => {
    if (!targetUserId.trim()) {
      setBellmanFordResult(null);
      setBellmanFordMessage('Please select an alumnus or enter a user ID first.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setBellmanFordResult(null);
      setBellmanFordMessage('Please log in again to continue.');
      return;
    }

    try {
      setBellmanFordLoading(true);
      setBellmanFordResult(null);
      setBellmanFordMessage('');

      const response = await axios.get(
        `${API_URL}/connections/bellman-ford/${encodeURIComponent(targetUserId.trim())}`,
        { headers: getAuthHeaders() }
      );

      setBellmanFordResult(response.data);
      setBellmanFordMessage(
        response.data.message || 'Bellman-Ford connection path calculated.'
      );
    } catch (error) {
      setBellmanFordResult(null);
      setBellmanFordMessage(
        error.response?.data?.message ||
          'Unable to calculate the connection path using Bellman-Ford.'
      );
    } finally {
      setBellmanFordLoading(false);
    }
  };

  // Find a connection path using the Floyd-Warshall algorithm
  const findFloydWarshallPath = async () => {
    if (!targetUserId.trim()) {
      setFloydWarshallResult(null);
      setFloydWarshallMessage('Please select an alumnus or enter a user ID first.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setFloydWarshallResult(null);
      setFloydWarshallMessage('Please log in again to continue.');
      return;
    }

    try {
      setFloydWarshallLoading(true);
      setFloydWarshallResult(null);
      setFloydWarshallMessage('');

      const response = await axios.get(
        `${API_URL}/connections/floyd-warshall/${encodeURIComponent(targetUserId.trim())}`,
        { headers: getAuthHeaders() }
      );

      setFloydWarshallResult(response.data);
      setFloydWarshallMessage(
        response.data.message || 'Floyd-Warshall connection path calculated.'
      );
    } catch (error) {
      setFloydWarshallResult(null);
      setFloydWarshallMessage(
        error.response?.data?.message ||
          'Unable to calculate the connection path using Floyd-Warshall.'
      );
    } finally {
      setFloydWarshallLoading(false);
    }
  };

  // Find whether the networking graph contains a Hamiltonian cycle
  const findHamiltonianCycle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setHamiltonianResult(null);
      setHamiltonianMessage('Please log in again to continue.');
      return;
    }

    try {
      setHamiltonianLoading(true);
      setHamiltonianResult(null);
      setHamiltonianMessage('');
      const response = await axios.get(`${API_URL}/algorithms/hamiltonian-cycle`, {
        headers: getAuthHeaders(),
      });
      setHamiltonianResult(response.data);
      setHamiltonianMessage(response.data.message || 'Hamiltonian cycle search completed.');
    } catch (error) {
      setHamiltonianResult(null);
      setHamiltonianMessage(
        error.response?.data?.message || 'Unable to find a Hamiltonian cycle in the networking graph.'
      );
    } finally {
      setHamiltonianLoading(false);
    }
  };

  // Color the networking graph to identify groups without assigning adjacent users the same color
  const findGraphColoring = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setGraphColoringResult(null);
      setGraphColoringMessage('Please log in again to continue.');
      return;
    }

    try {
      setGraphColoringLoading(true);
      setGraphColoringResult(null);
      setGraphColoringMessage('');
      const response = await axios.post(
        `${API_URL}/algorithms/graph-coloring`,
        {},
        { headers: getAuthHeaders() }
      );
      setGraphColoringResult(response.data);
      setGraphColoringMessage(response.data.message || 'Graph coloring completed successfully.');
    } catch (error) {
      setGraphColoringResult(null);
      setGraphColoringMessage(
        error.response?.data?.message || 'Unable to color the networking graph.'
      );
    } finally {
      setGraphColoringLoading(false);
    }
  };

  // Find subsets of the supplied numbers whose sum matches the target
  const findSumOfSubsets = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSumOfSubsetsResult(null);
      setSumOfSubsetsMessage('Please log in again to continue.');
      return;
    }

    const numbers = subsetNumbers
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value !== '')
      .map(Number);
    const target = Number(subsetTarget);

    if (numbers.length === 0 || numbers.some((value) => !Number.isFinite(value))) {
      setSumOfSubsetsResult(null);
      setSumOfSubsetsMessage('Enter valid numbers separated by commas.');
      return;
    }
    if (subsetTarget.trim() === '' || !Number.isFinite(target)) {
      setSumOfSubsetsResult(null);
      setSumOfSubsetsMessage('Enter a valid target sum.');
      return;
    }

    try {
      setSumOfSubsetsLoading(true);
      setSumOfSubsetsResult(null);
      setSumOfSubsetsMessage('');
      const response = await axios.post(
        `${API_URL}/algorithms/sum-of-subsets`,
        { numbers, target },
        { headers: getAuthHeaders() }
      );
      setSumOfSubsetsResult(response.data);
      setSumOfSubsetsMessage(response.data.message || 'Sum of Subsets search completed.');
    } catch (error) {
      setSumOfSubsetsResult(null);
      setSumOfSubsetsMessage(
        error.response?.data?.message || 'Unable to find subsets for the supplied target sum.'
      );
    } finally {
      setSumOfSubsetsLoading(false);
    }
  };

  // Find the minimum-cost tour using the Travelling Salesman Problem algorithm
  const findTravellingSalesmanTour = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTspResult(null);
      setTspMessage('Please log in again to continue.');
      return;
    }

    let distanceMatrix;
    try {
      distanceMatrix = JSON.parse(tspMatrix);
    } catch {
      setTspResult(null);
      setTspMessage('Enter a valid JSON distance matrix.');
      return;
    }

    if (
      !Array.isArray(distanceMatrix) ||
      distanceMatrix.length < 2 ||
      distanceMatrix.some((row) => !Array.isArray(row) || row.length !== distanceMatrix.length || row.some((value) => !Number.isFinite(Number(value)) || Number(value) < 0))
    ) {
      setTspResult(null);
      setTspMessage('The distance matrix must be square, contain at least two rows, and use non-negative numbers.');
      return;
    }

    try {
      setTspLoading(true);
      setTspResult(null);
      setTspMessage('');
      const response = await axios.post(
        `${API_URL}/algorithms/travelling-salesman`,
        { distanceMatrix },
        { headers: getAuthHeaders() }
      );
      setTspResult(response.data);
      setTspMessage(response.data.message || 'Travelling Salesman search completed.');
    } catch (error) {
      setTspResult(null);
      setTspMessage(error.response?.data?.message || 'Unable to calculate the travelling-salesman tour.');
    } finally {
      setTspLoading(false);
    }
  };

  // Find the optimal multiplication order for a chain of matrices
  const optimizeMatrixChain = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMatrixChainResult(null);
      setMatrixChainMessage('Please log in again to continue.');
      return;
    }

    const dimensions = matrixDimensions
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value !== '')
      .map(Number);

    if (dimensions.length < 2 || dimensions.some((value) => !Number.isFinite(value) || value <= 0)) {
      setMatrixChainResult(null);
      setMatrixChainMessage('Enter at least two positive matrix dimensions separated by commas.');
      return;
    }

    try {
      setMatrixChainLoading(true);
      setMatrixChainResult(null);
      setMatrixChainMessage('');
      const response = await axios.post(
        `${API_URL}/career/optimize-matrices`,
        { dimensions },
        { headers: getAuthHeaders() }
      );
      setMatrixChainResult(response.data);
      setMatrixChainMessage(response.data.message || 'Matrix Chain Multiplication optimization completed.');
    } catch (error) {
      setMatrixChainResult(null);
      setMatrixChainMessage(
        error.response?.data?.message || 'Unable to optimize the matrix multiplication order.'
      );
    } finally {
      setMatrixChainLoading(false);
    }
  };

  // Find groups of users connected to one another using Connected Components
  const findConnectedComponents = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setComponentsResult(null);
      setComponentsMessage('Please log in again to continue.');
      return;
    }

    try {
      setComponentsLoading(true);
      setComponentsResult(null);
      setComponentsMessage('');
      const response = await axios.get(`${API_URL}/connections/components`, {
        headers: getAuthHeaders(),
      });
      setComponentsResult(response.data);
      setComponentsMessage(response.data.message || 'Connected components loaded successfully.');
    } catch (error) {
      setComponentsResult(null);
      setComponentsMessage(
        error.response?.data?.message || 'Unable to load connected components.'
      );
    } finally {
      setComponentsLoading(false);
    }
  };

  // Build a minimum spanning recommendation tree using Kruskal's algorithm
  const findKruskalRecommendationTree = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setKruskalResult(null);
      setKruskalMessage('Please log in again to continue.');
      return;
    }

    try {
      setKruskalLoading(true);
      setKruskalResult(null);
      setKruskalMessage('');
      const response = await axios.get(`${API_URL}/connections/recommendation-tree`, {
        headers: getAuthHeaders(),
      });
      setKruskalResult(response.data);
      setKruskalMessage(response.data.message || 'Kruskal recommendation tree loaded successfully.');
    } catch (error) {
      setKruskalResult(null);
      setKruskalMessage(
        error.response?.data?.message || 'Unable to build the recommendation tree using Kruskal.'
      );
    } finally {
      setKruskalLoading(false);
    }
  };

  // Get career recommendations selected by the Knapsack algorithm
  const findKnapsackCareerRecommendations = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCareerRecommendations(null);
      setCareerRecommendationsMessage('Please log in again to continue.');
      return;
    }

    try {
      setCareerRecommendationsLoading(true);
      setCareerRecommendations(null);
      setCareerRecommendationsMessage('');
      const response = await axios.get(`${API_URL}/career/recommendations`, {
        headers: getAuthHeaders(),
      });
      setCareerRecommendations(response.data);
      setCareerRecommendationsMessage(
        response.data.message || 'Knapsack-based career recommendations loaded successfully.'
      );
    } catch (error) {
      setCareerRecommendations(null);
      setCareerRecommendationsMessage(
        error.response?.data?.message || 'Unable to load Knapsack career recommendations.'
      );
    } finally {
      setCareerRecommendationsLoading(false);
    }
  };


  // Allocate mentoring sessions using the resource-allocation algorithm
  const allocateMentoringSessions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setResourceAllocationResult(null);
      setResourceAllocationMessage('Please log in again to continue.');
      return;
    }

    try {
      setResourceAllocationLoading(true);
      setResourceAllocationResult(null);
      setResourceAllocationMessage('');
      const response = await axios.post(
        `${API_URL}/career/allocate-sessions`,
        {},
        { headers: getAuthHeaders() }
      );
      setResourceAllocationResult(response.data);
      setResourceAllocationMessage(
        response.data.message || 'Mentoring session allocation completed successfully.'
      );
    } catch (error) {
      setResourceAllocationResult(null);
      setResourceAllocationMessage(
        error.response?.data?.message || 'Unable to allocate mentoring sessions.'
      );
    } finally {
      setResourceAllocationLoading(false);
    }
  };

  // Compare skills using the Longest Common Subsequence (LCS) algorithm
  const compareSkills = async () => {
    if (!targetUserId.trim()) {
      setSkillsComparisonMessage('Please select an alumni or enter a user ID first.');
      setSkillsComparison(null);
      return;
    }

    setSkillsComparisonLoading(true);
    setSkillsComparisonMessage('');
    setSkillsComparison(null);

    try {
      const response = await axios.get(
        `${API_URL}/connections/compare-skills/${encodeURIComponent(targetUserId.trim())}`,
        {
          headers: getAuthHeaders(),
        }
      );

      setSkillsComparison(response.data);
      setSkillsComparisonMessage('Skills comparison completed successfully.');
    } catch (error) {
      setSkillsComparisonMessage(
        error.response?.data?.message || 'Failed to compare skills.'
      );
    } finally {
      setSkillsComparisonLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setConnectionPath(null);
    setTargetUserId('');
    setEmail('');
    setPassword('');

    setAlumni([]);
    setAlumniMessage('');
    setHasSearchedAlumni(false);
    setConnectionRequestMessages({});
    setRequestingUserId('');

    setPendingRequests([]);
    setPendingMessage('');
    setHasLoadedPendingRequests(false);
    setCancellingRequestId('');

    setIncomingRequests([]);
    setIncomingMessage('');
    setHasLoadedIncomingRequests(false);
    setAcceptingRequestId('');

    setConnections([]);
    setConnectionsMessage('');
    setHasLoadedConnections(false);
        setAlumniTree([]);
    setAlumniTreeMessage('');
    setHasLoadedAlumniTree(false);
    setAlumniTreeLoading(false);

    setFilters({
      department: '',
      graduationYear: '',
      company: '',
      skills: '',
    });

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold text-blue-600">
          Smart Alumni Networking and Career Support System
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Connect with alumni and discover the shortest connection path
          using Breadth-First Search (BFS).
        </p>

        {!user ? (
          <div className="rounded-lg border border-gray-200 p-6">
            {authMode === 'login' ? (
              <>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Login
                </h2>

                <form onSubmit={handleLogin}>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />

                  <label
                    htmlFor="password"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setMessage('');
                    }}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  Create Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-3">
                  <div>
                    <label
                      htmlFor="registerName"
                      className="mb-1 block font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="registerName"
                      name="name"
                      value={registerForm.name}
                      onChange={handleRegisterFieldChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="registerEmail"
                      className="mb-1 block font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="registerEmail"
                      name="email"
                      type="email"
                      value={registerForm.email}
                      onChange={handleRegisterFieldChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="registerPassword"
                      className="mb-1 block font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="registerPassword"
                      name="password"
                      type="password"
                      value={registerForm.password}
                      onChange={handleRegisterFieldChange}
                      placeholder="Create a password (minimum 6 characters)"
                      autoComplete="new-password"
                      minLength={6}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="registerRole"
                      className="mb-1 block font-medium text-gray-700"
                    >
                      Account Type
                    </label>
                    <select
                      id="registerRole"
                      name="role"
                      value={registerForm.role}
                      onChange={handleRegisterFieldChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
                    >
                      <option value="student">Student</option>
                      <option value="alumni">Alumni</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="registerDepartment"
                      className="mb-1 block font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <input
                      id="registerDepartment"
                      name="department"
                      value={registerForm.department}
                      onChange={handleRegisterFieldChange}
                      placeholder="e.g. Computer Science"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="registerYear"
                      className="mb-1 block font-medium text-gray-700"
                    >
                      Graduation Year
                    </label>
                    <input
                      id="registerYear"
                      name="graduationYear"
                      type="number"
                      min="1950"
                      max="2100"
                      value={registerForm.graduationYear}
                      onChange={handleRegisterFieldChange}
                      placeholder="e.g. 2029"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />
                  </div>

                  {registerForm.role === 'alumni' && (
                    <div>
                      <label
                        htmlFor="registerCompany"
                        className="mb-1 block font-medium text-gray-700"
                      >
                        Company
                      </label>
                      <input
                        id="registerCompany"
                        name="company"
                        value={registerForm.company}
                        onChange={handleRegisterFieldChange}
                        placeholder="e.g. Infosys"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="registerSkills"
                      className="mb-1 block font-medium text-gray-700"
                    >
                      Skills
                    </label>
                    <input
                      id="registerSkills"
                      name="skills"
                      value={registerForm.skills}
                      onChange={handleRegisterFieldChange}
                      placeholder="e.g. JavaScript, React, DSA"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Separate each skill with a comma.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setMessage('');
                    }}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Back to Login
                  </button>
                </p>
              </>
            )}

            {message && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-gray-50 p-3 text-gray-700"
              >
                {message}
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Logged-in user information */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-blue-50 p-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Welcome, {user.name}!
                </p>
                <p className="text-sm capitalize text-gray-600">
                  Role: {user.role}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-red-500 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>

            {/* BFS shortest connection path */}
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Find an Alumni Connection Path
              </h2>

              <form onSubmit={findConnectionPath}>
                <label
                  htmlFor="targetUserId"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Alumnus User ID
                </label>

                <input
                  id="targetUserId"
                  type="text"
                  value={targetUserId}
                  onChange={(event) => setTargetUserId(event.target.value)}
                  placeholder="Enter the alumnus user ID"
                  required
                  className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Searching...' : 'Find Shortest Path'}
                  </button>

                  <button
                    type="button"
                    className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={compareSkills}
                    disabled={skillsComparisonLoading}
                  >
                    {skillsComparisonLoading
                      ? 'Comparing Skills...'
                      : 'Compare Skills (LCS)'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={findDfsPath}
                  disabled={dfsLoading}
                  className="mt-3 w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {dfsLoading ? 'Exploring Connections...' : 'Explore Connection Path (DFS)'}
                </button>

                {dfsMessage && (
                  <p role="status" className="mt-3 rounded-lg bg-orange-50 p-3 text-orange-800">
                    {dfsMessage}
                  </p>
                )}

                <button
                  type="button"
                  onClick={findDijkstraPath}
                  disabled={dijkstraLoading}
                  className="mt-3 w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {dijkstraLoading
                    ? 'Calculating Lowest-Cost Path...'
                    : 'Find Lowest-Cost Path (Dijkstra)'}
                </button>

                {dijkstraMessage && (
                  <p
                    role="status"
                    className="mt-3 rounded-lg bg-purple-50 p-3 text-purple-800"
                  >
                    {dijkstraMessage}
                  </p>
                )}

                <button
                  type="button"
                  onClick={findBellmanFordPath}
                  disabled={bellmanFordLoading}
                  className="mt-3 w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {bellmanFordLoading
                    ? 'Calculating Bellman-Ford Path...'
                    : 'Find Connection Path (Bellman-Ford)'}
                </button>

                {bellmanFordMessage && (
                  <p
                    role="status"
                    className="mt-3 rounded-lg bg-teal-50 p-3 text-teal-800"
                  >
                    {bellmanFordMessage}
                  </p>
                )}

                <button
                  type="button"
                  onClick={findFloydWarshallPath}
                  disabled={floydWarshallLoading}
                  className="mt-3 w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {floydWarshallLoading
                    ? 'Calculating Floyd-Warshall Path...'
                    : 'Find Connection Path (Floyd-Warshall)'}
                </button>

                {floydWarshallMessage && (
                  <p
                    role="status"
                    className="mt-3 rounded-lg bg-indigo-50 p-3 text-indigo-800"
                  >
                    {floydWarshallMessage}
                  </p>
                )}

                <button
                  type="button"
                  onClick={findConnectedComponents}
                  disabled={componentsLoading}
                  className="mt-3 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {componentsLoading ? 'Finding Connected Groups...' : 'Find Connected Components'}
                </button>

                {componentsMessage && (
                  <p role="status" className="mt-3 rounded-lg bg-emerald-50 p-3 text-emerald-800">
                    {componentsMessage}
                  </p>
                )}

                <button
                  type="button"
                  onClick={findKruskalRecommendationTree}
                  disabled={kruskalLoading}
                  className="mt-3 w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {kruskalLoading ? 'Building Recommendation Tree...' : "Build Recommendation Tree (Kruskal's Algorithm)"}
                </button>
                {kruskalMessage && (
                  <p role="status" className="mt-3 rounded-lg bg-amber-50 p-3 text-amber-800">
                    {kruskalMessage}
                  </p>
                )}

                <button
                  type="button"
                  onClick={findKnapsackCareerRecommendations}
                  disabled={careerRecommendationsLoading}
                  className="mt-3 w-full rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {careerRecommendationsLoading
                    ? 'Selecting Career Recommendations...'
                    : 'Get Career Recommendations (Knapsack Algorithm)'}
                </button>
                {careerRecommendationsMessage && (
                  <p role="status" className="mt-3 rounded-lg bg-pink-50 p-3 text-pink-800">
                    {careerRecommendationsMessage}
                  </p>
                )}

                {careerRecommendations && (
                  <div className="mt-6 rounded-lg border border-pink-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-2 text-xl font-semibold text-pink-800">
                      Career Recommendations
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                      Algorithm: {careerRecommendations.algorithm || '0/1 Knapsack'}
                    </p>
                    {careerRecommendations.description && (
                      <p className="mb-4 text-sm text-gray-600">{careerRecommendations.description}</p>
                    )}
                    {careerRecommendations.totalValue !== undefined && (
                      <p className="mb-3 text-gray-700">Total recommendation value: <strong>{careerRecommendations.totalValue}</strong></p>
                    )}
                    {careerRecommendations.capacity !== undefined && (
                      <p className="mb-3 text-gray-700">Available capacity: <strong>{careerRecommendations.capacity}</strong></p>
                    )}
                    {(() => {
                      const items = careerRecommendations.recommendations || careerRecommendations.selectedItems || careerRecommendations.items || careerRecommendations.result;
                      if (!Array.isArray(items) || items.length === 0) {
                        return <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-pink-50 p-4 text-sm text-gray-700">{JSON.stringify(careerRecommendations, null, 2)}</pre>;
                      }
                      return (
                        <div className="space-y-2">
                          {items.map((item, index) => (
                            <div key={item._id || item.id || index} className="rounded-lg bg-pink-50 p-3">
                              <p className="font-semibold text-gray-800">{item.title || item.name || item.role || item.label || `Recommendation ${index + 1}`}</p>
                              {item.description && <p className="mt-1 text-sm text-gray-600">{item.description}</p>}
                              {(item.value !== undefined || item.score !== undefined) && <p className="mt-1 text-sm text-pink-800">Value: {item.value ?? item.score}</p>}
                              {(item.weight !== undefined || item.cost !== undefined) && <p className="text-sm text-gray-600">Weight: {item.weight ?? item.cost}</p>}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
            

                {/* Resource allocation for mentoring sessions */}
                <button
                  type="button"
                  onClick={allocateMentoringSessions}
                  disabled={resourceAllocationLoading}
                  className="mt-3 w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resourceAllocationLoading
                    ? 'Allocating Mentoring Sessions...'
                    : 'Allocate Mentoring Sessions (Resource Allocation)'}
                </button>
                {resourceAllocationMessage && (
                  <p role="status" className="mt-3 rounded-lg bg-indigo-50 p-3 text-indigo-800">
                    {resourceAllocationMessage}
                  </p>
                )}
                {resourceAllocationResult && (
                  <div className="mt-4 rounded-lg border border-indigo-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-xl font-semibold text-indigo-800">Mentoring Session Allocation</h2>
                    <p className="mb-3 text-sm text-gray-600">
                      Algorithm: {resourceAllocationResult.algorithm || 'Resource Allocation'}
                    </p>
                    {resourceAllocationResult.description && (
                      <p className="mb-3 text-sm text-gray-600">{resourceAllocationResult.description}</p>
                    )}
                    {(() => {
                      const allocations = resourceAllocationResult.allocations || resourceAllocationResult.sessions || resourceAllocationResult.assignedSessions || resourceAllocationResult.result;
                      if (!Array.isArray(allocations) || allocations.length === 0) {
                        return <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-indigo-50 p-4 text-sm text-gray-700">{JSON.stringify(resourceAllocationResult, null, 2)}</pre>;
                      }
                      return (
                        <div className="space-y-2">
                          {allocations.map((allocation, index) => (
                            <div key={allocation._id || allocation.id || index} className="rounded-lg bg-indigo-50 p-3">
                              <p className="font-semibold text-gray-800">{allocation.title || allocation.sessionName || allocation.name || `Allocation ${index + 1}`}</p>
                              {(allocation.mentor?.name || allocation.mentorName || allocation.assignedTo) && (
                                <p className="mt-1 text-sm text-gray-600">Mentor: {allocation.mentor?.name || allocation.mentorName || allocation.assignedTo}</p>
                              )}
                              {allocation.status && <p className="mt-1 text-sm text-indigo-800">Status: {allocation.status}</p>}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Hamiltonian Cycle algorithm */}
                <button
                  type="button"
                  onClick={findHamiltonianCycle}
                  disabled={hamiltonianLoading}
                  className="mt-3 w-full rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {hamiltonianLoading ? 'Searching for Hamiltonian Cycle...' : 'Find Hamiltonian Cycle'}
                </button>
                {hamiltonianMessage && (
                  <p role="status" className="mt-3 rounded-lg bg-cyan-50 p-3 text-cyan-800">
                    {hamiltonianMessage}
                  </p>
                )}
                {hamiltonianResult && (
                  <div className="mt-4 rounded-lg border border-cyan-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-xl font-semibold text-cyan-800">Hamiltonian Cycle Result</h2>
                    <p className="mb-3 text-sm text-gray-600">
                      Algorithm: {hamiltonianResult.algorithm || 'Hamiltonian Cycle'}
                    </p>
                    {hamiltonianResult.description && (
                      <p className="mb-3 text-sm text-gray-600">{hamiltonianResult.description}</p>
                    )}
                    {(() => {
                      const cycle = hamiltonianResult.cycle || hamiltonianResult.path || hamiltonianResult.hamiltonianCycle || hamiltonianResult.result;
                      if (Array.isArray(cycle) && cycle.length > 0) {
                        return <p className="rounded-lg bg-cyan-50 p-4 font-medium text-gray-800">{cycle.map((item) => typeof item === 'object' ? item.name || item.user?.name || item.userId || JSON.stringify(item) : item).join(' → ')}</p>;
                      }
                      return <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-cyan-50 p-4 text-sm text-gray-700">{JSON.stringify(hamiltonianResult, null, 2)}</pre>;
                    })()}
                  </div>
                )}

                {/* Graph Coloring algorithm */}
                <button
                  type="button"
                  onClick={findGraphColoring}
                  disabled={graphColoringLoading}
                  className="mt-3 w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {graphColoringLoading ? 'Coloring Networking Graph...' : 'Color Networking Graph (Graph Coloring)'}
                </button>
                {graphColoringMessage && (
                  <p role="status" className="mt-3 rounded-lg bg-teal-50 p-3 text-teal-800">
                    {graphColoringMessage}
                  </p>
                )}
                {graphColoringResult && (
                  <div className="mt-4 rounded-lg border border-teal-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-2 text-xl font-semibold text-teal-800">Networking Graph Coloring</h2>
                    <p className="mb-3 text-sm text-gray-600">
                      Algorithm: {graphColoringResult.algorithm || 'Graph Coloring'}
                    </p>
                    {graphColoringResult.description && (
                      <p className="mb-3 text-sm text-gray-600">{graphColoringResult.description}</p>
                    )}
                    {graphColoringResult.colorCount !== undefined && (
                      <p className="mb-3 text-gray-700">Colors used: <strong>{graphColoringResult.colorCount}</strong></p>
                    )}
                    {(() => {
                      const coloring = graphColoringResult.coloring || graphColoringResult.colors || graphColoringResult.assignments || graphColoringResult.result;
                      if (!coloring || (typeof coloring === 'object' && !Array.isArray(coloring) && Object.keys(coloring).length === 0) || (Array.isArray(coloring) && coloring.length === 0)) {
                        return <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-teal-50 p-4 text-sm text-gray-700">{JSON.stringify(graphColoringResult, null, 2)}</pre>;
                      }
                      const entries = Array.isArray(coloring)
                        ? coloring.map((item, index) => [item.user?.name || item.name || item.userId || item.vertex || `User ${index + 1}`, item.color ?? item.colorName ?? item.assignedColor ?? item.group])
                        : Object.entries(coloring).map(([name, color]) => [name, typeof color === 'object' ? color.color ?? color.name ?? JSON.stringify(color) : color]);
                      return (
                        <div className="space-y-2">
                          {entries.map(([name, color], index) => (
                            <div key={`${name}-${index}`} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-teal-50 p-3">
                              <span className="font-medium text-gray-800">{name}</span>
                              <span className="rounded-full border border-teal-200 bg-white px-3 py-1 text-sm text-teal-800">Color: {color ?? 'Not specified'}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Sum of Subsets algorithm */}
                <div className="mt-6 rounded-lg border border-rose-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-2 text-xl font-semibold text-rose-800">Sum of Subsets</h2>
                  <p className="mb-4 text-sm text-gray-600">
                    Find combinations of numbers whose sum equals the target value.
                  </p>
                  <label htmlFor="subsetNumbers" className="mb-1 block text-sm font-medium text-gray-700">
                    Numbers (comma-separated)
                  </label>
                  <input
                    id="subsetNumbers"
                    type="text"
                    value={subsetNumbers}
                    onChange={(event) => setSubsetNumbers(event.target.value)}
                    placeholder="Example: 2, 3, 5, 7"
                    className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none"
                  />
                  <label htmlFor="subsetTarget" className="mb-1 block text-sm font-medium text-gray-700">
                    Target sum
                  </label>
                  <input
                    id="subsetTarget"
                    type="number"
                    value={subsetTarget}
                    onChange={(event) => setSubsetTarget(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={findSumOfSubsets}
                    disabled={sumOfSubsetsLoading}
                    className="mt-3 w-full rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sumOfSubsetsLoading ? 'Finding Subsets...' : 'Find Matching Subsets (Sum of Subsets)'}
                  </button>
                  {sumOfSubsetsMessage && (
                    <p role="status" className="mt-3 rounded-lg bg-rose-50 p-3 text-rose-800">
                      {sumOfSubsetsMessage}
                    </p>
                  )}
                  {sumOfSubsetsResult && (
                    <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4">
                      <p className="mb-2 text-sm text-gray-600">
                        Algorithm: {sumOfSubsetsResult.algorithm || 'Sum of Subsets'}
                      </p>
                      {sumOfSubsetsResult.description && (
                        <p className="mb-3 text-sm text-gray-600">{sumOfSubsetsResult.description}</p>
                      )}
                      <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(sumOfSubsetsResult, null, 2)}</pre>
                    </div>
                  )}
                </div>

                {/* Travelling Salesman Problem algorithm */}
                <div className="mt-6 rounded-lg border border-indigo-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-2 text-xl font-semibold text-indigo-800">Travelling Salesman Problem (TSP)</h2>
                  <p className="mb-4 text-sm text-gray-600">
                    Find a low-cost tour that visits each city once and returns to the starting city. Enter a square distance matrix as JSON.
                  </p>
                  <label htmlFor="tspMatrix" className="mb-1 block text-sm font-medium text-gray-700">Distance matrix (JSON)</label>
                  <textarea
                    id="tspMatrix"
                    value={tspMatrix}
                    onChange={(event) => setTspMatrix(event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder="[[0, 10], [10, 0]]"
                  />
                  <button
                    type="button"
                    onClick={findTravellingSalesmanTour}
                    disabled={tspLoading}
                    className="mt-3 w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {tspLoading ? 'Calculating Tour...' : 'Calculate Tour (TSP)'}
                  </button>
                  {tspMessage && <p role="status" className="mt-3 rounded-lg bg-indigo-50 p-3 text-indigo-800">{tspMessage}</p>}
                  {tspResult && (
                    <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                      <p className="mb-2 text-sm text-gray-600">Algorithm: {tspResult.algorithm || 'Travelling Salesman Problem'}</p>
                      {tspResult.description && <p className="mb-3 text-sm text-gray-600">{tspResult.description}</p>}
                      <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(tspResult, null, 2)}</pre>
                    </div>
                  )}
                </div>

                {/* Matrix Chain Multiplication algorithm */}
                <div className="mt-6 rounded-lg border border-cyan-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-2 text-xl font-semibold text-cyan-800">Matrix Chain Multiplication</h2>
                  <p className="mb-4 text-sm text-gray-600">
                    Find an efficient order for multiplying a sequence of matrices. Enter dimensions as comma-separated numbers; for example, 10, 30, 5, 60 represents matrices 10×30, 30×5, and 5×60.
                  </p>
                  <label htmlFor="matrixDimensions" className="mb-1 block text-sm font-medium text-gray-700">
                    Matrix dimensions
                  </label>
                  <input
                    id="matrixDimensions"
                    type="text"
                    value={matrixDimensions}
                    onChange={(event) => setMatrixDimensions(event.target.value)}
                    placeholder="Example: 10, 30, 5, 60"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={optimizeMatrixChain}
                    disabled={matrixChainLoading}
                    className="mt-3 w-full rounded-lg bg-cyan-700 px-6 py-3 font-semibold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {matrixChainLoading ? 'Optimizing Order...' : 'Optimize Matrix Multiplication Order'}
                  </button>
                  {matrixChainMessage && (
                    <p role="status" className="mt-3 rounded-lg bg-cyan-50 p-3 text-cyan-900">
                      {matrixChainMessage}
                    </p>
                  )}
                  {matrixChainResult && (
                    <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
                      <p className="mb-2 text-sm text-gray-600">
                        Algorithm: {matrixChainResult.algorithm || 'Matrix Chain Multiplication'}
                      </p>
                      {matrixChainResult.description && (
                        <p className="mb-3 text-sm text-gray-600">{matrixChainResult.description}</p>
                      )}
                      <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(matrixChainResult, null, 2)}</pre>
                    </div>
                  )}
                </div>

            {/* Kruskal recommendation tree results */}
            {kruskalResult && (
              <div className="mt-6 rounded-lg border border-amber-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-amber-800">
                  Alumni Recommendation Tree
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Algorithm: {kruskalResult.algorithm || "Kruskal's Minimum Spanning Tree"}
                </p>
                {kruskalResult.description && (
                  <p className="mb-4 text-sm text-gray-600">{kruskalResult.description}</p>
                )}
                {kruskalResult.totalCost !== undefined && (
                  <p className="mb-3 text-gray-700">Total recommendation cost: <strong>{kruskalResult.totalCost}</strong></p>
                )}
                {kruskalResult.edgeCount !== undefined && (
                  <p className="mb-3 text-gray-700">Connections in tree: <strong>{kruskalResult.edgeCount}</strong></p>
                )}
                {(() => {
                  const edges = kruskalResult.edges || kruskalResult.tree || kruskalResult.recommendationTree || kruskalResult.result;
                  if (!Array.isArray(edges) || edges.length === 0) {
                    return <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-amber-50 p-4 text-sm text-gray-700">{JSON.stringify(kruskalResult, null, 2)}</pre>;
                  }
                  return (
                    <div className="space-y-2">
                      {edges.map((edge, index) => {
                        const from = edge.from?.name || edge.source?.name || edge.from || edge.source || edge.start?.name || edge.start || 'User A';
                        const to = edge.to?.name || edge.target?.name || edge.to || edge.target || edge.end?.name || edge.end || 'User B';
                        const weight = edge.weight ?? edge.cost ?? edge.distance;
                        return (
                          <div key={edge._id || index} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-amber-50 p-3">
                            <span className="font-medium text-gray-800">{typeof from === 'object' ? from.name || from.email || 'User A' : from} ↔ {typeof to === 'object' ? to.name || to.email || 'User B' : to}</span>
                            {weight !== undefined && <span className="text-sm text-amber-800">Cost: {weight}</span>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* LCS skills comparison results */}
            {skillsComparison && (
              <div className="mt-6 rounded-lg border border-green-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-gray-800">
                  Skills Comparison Results
                </h2>

                <p className="mb-4 text-sm text-gray-600">
                  Algorithm: {skillsComparison.algorithm}
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h3 className="mb-2 font-semibold text-blue-800">
                      Your Skills
                    </h3>

                    <p className="mb-2 text-gray-700">
                      {skillsComparison.currentUser?.name}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skillsComparison.currentUser?.skills?.length > 0 ? (
                        skillsComparison.currentUser.skills.map(
                          (skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-sm text-gray-500">
                          No skills added yet.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-4">
                    <h3 className="mb-2 font-semibold text-purple-800">
                      Alumni Skills
                    </h3>

                    <p className="mb-2 text-gray-700">
                      {skillsComparison.targetUser?.name}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skillsComparison.targetUser?.skills?.length > 0 ? (
                        skillsComparison.targetUser.skills.map(
                          (skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
                            >
                              {skill}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-sm text-gray-500">
                          No skills added yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="font-semibold text-green-800">
                    Common Skills (LCS)
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    Number of common skills:{" "}
                    <strong>{skillsComparison.commonSkillsCount}</strong>
                  </p>

                  {skillsComparison.commonSkills?.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skillsComparison.commonSkills.map(
                        (skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-900"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-600">
                      No common skills were found in the LCS.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* DFS connection traversal results */}
            {dfsResult && (
              <div className="mt-6 rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-orange-800">
                  DFS Connection Path
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Algorithm: {dfsResult.algorithm || 'Depth-First Search (DFS)'}
                </p>
                <p className="mb-4 text-gray-700">
                  Number of connections: <strong>{dfsResult.connectionCount ?? 0}</strong>
                </p>
                <div className="rounded-lg bg-orange-50 p-4">
                  <h3 className="mb-3 font-semibold text-orange-800">Traversal Path</h3>
                  {Array.isArray(dfsResult.path) && dfsResult.path.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {dfsResult.path.map((person, index) => (
                        <div key={person?._id || person?.id || index} className="flex items-center gap-2">
                          <span className="rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-gray-800">
                            {typeof person === 'string' ? person : person?.name || 'Unknown User'}
                          </span>
                          {index < dfsResult.path.length - 1 && (
                            <span className="font-bold text-orange-600">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No DFS path is available for this user.</p>
                  )}
                </div>
                {dfsResult.description && (
                  <p className="mt-4 text-sm text-gray-600">{dfsResult.description}</p>
                )}
              </div>
            )}

            {/* Bellman-Ford connection path results */}
            {bellmanFordResult && (
              <div className="mt-6 rounded-lg border border-teal-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-teal-800">
                  Bellman-Ford Connection Path
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Algorithm: {bellmanFordResult.algorithm || 'Bellman-Ford Algorithm'}
                </p>
                <p className="mb-4 text-gray-700">
                  Number of connections: <strong>{bellmanFordResult.connectionCount ?? 0}</strong>
                </p>
                {bellmanFordResult.totalCost !== undefined && (
                  <p className="mb-4 text-gray-700">
                    Total path cost: <strong>{bellmanFordResult.totalCost}</strong>
                  </p>
                )}
                <div className="rounded-lg bg-teal-50 p-4">
                  <h3 className="mb-3 font-semibold text-teal-800">Connection Path</h3>
                  {Array.isArray(bellmanFordResult.path) && bellmanFordResult.path.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {bellmanFordResult.path.map((person, index) => (
                        <div
                          key={person?._id || person?.id || index}
                          className="flex items-center gap-2"
                        >
                          <span className="rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm font-medium text-gray-800">
                            {typeof person === 'string' ? person : person?.name || 'Unknown User'}
                          </span>
                          {index < bellmanFordResult.path.length - 1 && (
                            <span className="font-bold text-teal-600">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No connection path is available for this user.
                    </p>
                  )}
                </div>
                {bellmanFordResult.description && (
                  <p className="mt-4 text-sm text-gray-600">
                    {bellmanFordResult.description}
                  </p>
                )}
              </div>
            )}


            {/* Connected Components results */}
            {componentsResult && (
              <div className="mt-6 rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-emerald-800">
                  Connected Components
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Algorithm: {componentsResult.algorithm || 'Connected Components'}
                </p>
                {componentsResult.description && (
                  <p className="mb-4 text-sm text-gray-600">{componentsResult.description}</p>
                )}
                <p className="mb-4 text-gray-700">
                  Number of connected groups: <strong>{componentsResult.componentCount ?? (Array.isArray(componentsResult.components) ? componentsResult.components.length : 'Not provided')}</strong>
                </p>
                {Array.isArray(componentsResult.components) && componentsResult.components.length > 0 ? (
                  <div className="space-y-3">
                    {componentsResult.components.map((component, index) => {
                      const members = Array.isArray(component)
                        ? component
                        : Array.isArray(component.members)
                          ? component.members
                          : Array.isArray(component.users)
                            ? component.users
                            : [];
                      return (
                        <div key={component.id || index} className="rounded-lg bg-emerald-50 p-4">
                          <h3 className="mb-2 font-semibold text-emerald-800">
                            {component.name || `Group ${index + 1}`}
                          </h3>
                          {members.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {members.map((person, memberIndex) => (
                                <span key={person?._id || person?.id || memberIndex} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-gray-800">
                                  {typeof person === 'string' ? person : person?.name || person?.email || 'Unknown User'}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(component, null, 2)}</pre>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No component details were returned by the server.</p>
                )}
              </div>
            )}

            {/* Floyd-Warshall connection path results */}
            {floydWarshallResult && (
              <div className="mt-6 rounded-lg border border-indigo-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-indigo-800">
                  Floyd-Warshall Connection Path
                </h2>

                <p className="mb-4 text-sm text-gray-600">
                  Algorithm: {floydWarshallResult.algorithm || 'Floyd-Warshall Algorithm'}
                </p>

                <p className="mb-2 text-gray-700">
                  Number of connections:{' '}
                  <strong>{floydWarshallResult.connectionCount ?? 0}</strong>
                </p>

                {floydWarshallResult.totalCost !== undefined && (
                  <p className="mb-4 text-gray-700">
                    Total path cost: <strong>{floydWarshallResult.totalCost}</strong>
                  </p>
                )}

                <div className="rounded-lg bg-indigo-50 p-4">
                  <h3 className="mb-3 font-semibold text-indigo-800">Connection Path</h3>
                  {Array.isArray(floydWarshallResult.path) && floydWarshallResult.path.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {floydWarshallResult.path.map((person, index) => (
                        <div
                          key={person._id || person.id || index}
                          className="flex items-center gap-2"
                        >
                          <span className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm font-medium text-gray-800">
                            {person.name || 'Unknown User'}
                          </span>
                          {index < floydWarshallResult.path.length - 1 && (
                            <span className="font-bold text-indigo-600">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No connection path is available for this user.
                    </p>
                  )}
                </div>

                {floydWarshallResult.description && (
                  <p className="mt-4 text-sm text-gray-600">
                    {floydWarshallResult.description}
                  </p>
                )}
              </div>
            )}

            {/* Dijkstra suggested networking path results */}
            {dijkstraResult && (
              <div className="mt-6 rounded-lg border border-purple-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-semibold text-purple-800">
                  Lowest-Cost Networking Path
                </h2>

                <p className="mb-4 text-sm text-gray-600">
                  Algorithm: {dijkstraResult.algorithm || "Dijkstra's Shortest Path Algorithm"}
                </p>

                <p className="mb-2 text-gray-700">
                  Number of connections:{' '}
                  <strong>{dijkstraResult.connectionCount ?? 0}</strong>
                </p>

                <p className="mb-4 text-gray-700">
                  Total path cost:{' '}
                  <strong>{dijkstraResult.totalCost ?? 'Not available'}</strong>
                </p>

                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-3 font-semibold text-purple-800">
                    Suggested Path
                  </h3>

                  {Array.isArray(dijkstraResult.path) && dijkstraResult.path.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {dijkstraResult.path.map((person, index) => (
                        <div
                          key={person._id || person.id || index}
                          className="flex items-center gap-2"
                        >
                          <span className="rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm font-medium text-gray-800">
                            {person.name || 'Unknown User'}
                          </span>

                          {index < dijkstraResult.path.length - 1 && (
                            <span className="font-bold text-purple-600">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No suggested path is available for this user.
                    </p>
                  )}
                </div>

                {dijkstraResult.description && (
                  <p className="mt-4 text-sm text-gray-600">
                    {dijkstraResult.description}
                  </p>
                )}
              </div>
            )}


              </form>

              {message && (
                <p
                  role="status"
                  className="mt-4 rounded-lg bg-gray-50 p-3 text-gray-700"
                >
                  {message}
                </p>
              )}
            </div>

            {/* Incoming requests: only for alumni accounts */}
            {user.role === 'alumni' && (
              <div className="mt-6 rounded-lg border border-green-200 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Incoming Connection Requests
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Requests sent to you by students. Accept a request to
                      connect with them.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fetchIncomingRequests}
                    disabled={incomingLoading}
                    className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {incomingLoading ? 'Loading...' : 'Load Incoming Requests'}
                  </button>
                </div>

                {incomingMessage && (
                  <p
                    role="status"
                    className="mt-4 rounded-lg bg-gray-50 p-3 text-gray-700"
                  >
                    {incomingMessage}
                  </p>
                )}

                {hasLoadedIncomingRequests && (
                  <div className="mt-4 space-y-3">
                    {incomingRequests.length === 0 && !incomingLoading && (
                      <p className="text-gray-600">
                        You have no incoming connection requests.
                      </p>
                    )}

                    {incomingRequests.map((request) => {
                      const requester = request.user1 || {};

                      return (
                        <div
                          key={request._id}
                          className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                        >
                          <h3 className="font-semibold text-gray-800">
                            {requester.name || 'Student'}
                          </h3>

                          <p className="text-sm text-gray-600">
                            {requester.email || ''}
                          </p>

                          <p className="text-sm text-gray-600">
                            {requester.department || 'Department not specified'}
                          </p>

                          {requester.graduationYear && (
                            <p className="text-sm text-gray-600">
                              Graduation Year: {requester.graduationYear}
                            </p>
                          )}

                          {Array.isArray(requester.skills) &&
                            requester.skills.length > 0 && (
                              <p className="text-sm text-gray-600">
                                Skills: {requester.skills.join(', ')}
                              </p>
                            )}

                          <p className="mt-2 text-sm font-medium text-amber-700">
                            Status: Pending
                          </p>

                          <button
                            type="button"
                            onClick={() => acceptIncomingRequest(request._id)}
                            disabled={acceptingRequestId === request._id}
                            className="mt-3 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {acceptingRequestId === request._id
                              ? 'Accepting...'
                              : 'Accept Request'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* My Pending Requests: requests sent by this user */}
            <div className="mt-6 rounded-lg border border-gray-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    My Pending Requests
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    View connection requests you have sent that have not been
                    accepted yet.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchPendingRequests}
                  disabled={pendingLoading}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pendingLoading ? 'Loading...' : 'Load Pending Requests'}
                </button>
              </div>

              {pendingMessage && (
                <p
                  role="status"
                  className="mt-4 rounded-lg bg-gray-50 p-3 text-gray-700"
                >
                  {pendingMessage}
                </p>
              )}

              {hasLoadedPendingRequests && (
                <div className="mt-4 space-y-3">
                  {pendingRequests.length === 0 && !pendingLoading && (
                    <p className="text-gray-600">
                      You have no pending connection requests.
                    </p>
                  )}

                  {pendingRequests.map((request) => {
                    const recipient = request.user2 || {};

                    return (
                      <div
                        key={request._id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                      >
                        <h3 className="font-semibold text-gray-800">
                          {recipient.name || 'User'}
                        </h3>

                        <p className="text-sm capitalize text-gray-600">
                          {recipient.role || 'Role not specified'}
                        </p>

                        <p className="text-sm text-gray-600">
                          {recipient.department || 'Department not specified'}
                        </p>

                        {recipient.graduationYear && (
                          <p className="text-sm text-gray-600">
                            Graduation Year: {recipient.graduationYear}
                          </p>
                        )}

                        {recipient.company && (
                          <p className="text-sm text-gray-600">
                            Company: {recipient.company}
                          </p>
                        )}

                        <p className="mt-2 text-sm font-medium text-amber-700">
                          Status: Pending
                        </p>

                        <button
                          type="button"
                          onClick={() => cancelPendingRequest(request._id)}
                          disabled={cancellingRequestId === request._id}
                          className="mt-3 rounded-lg border border-red-500 px-4 py-2 font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {cancellingRequestId === request._id
                            ? 'Cancelling...'
                            : 'Cancel Request'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* My Connections */}
            <div className="mt-6 rounded-lg border border-gray-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    My Connections
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    View alumni and students whose connection requests have
                    been accepted.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchConnections}
                  disabled={connectionsLoading}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {connectionsLoading ? 'Loading...' : 'Load My Connections'}
                </button>
              </div>

              {connectionsMessage && (
                <p
                  role="status"
                  className="mt-4 rounded-lg bg-gray-50 p-3 text-gray-700"
                >
                  {connectionsMessage}
                </p>
              )}

              {hasLoadedConnections && (
                <div className="mt-4 space-y-3">
                  {connections.length === 0 && !connectionsLoading && (
                    <p className="text-gray-600">
                      No accepted connections found.
                    </p>
                  )}

                  {connections.map((connection, index) => {
                    const currentUserId = String(user?._id || '');
                    const requesterId = connection.requester?._id
                      ? String(connection.requester._id)
                      : String(connection.requester || '');
                    const recipientId = connection.recipient?._id
                      ? String(connection.recipient._id)
                      : String(connection.recipient || '');

                    let connectedUser =
                      connection.user || connection.alumnus || null;

                    if (
                      !connectedUser &&
                      connection.requester &&
                      connection.recipient
                    ) {
                      connectedUser =
                        requesterId === currentUserId
                          ? connection.recipient
                          : recipientId === currentUserId
                            ? connection.requester
                            : connection.recipient;
                    }

                    if (
                      connectedUser &&
                      typeof connectedUser !== 'object'
                    ) {
                      connectedUser = null;
                    }

                    const displayName =
                      connectedUser?.name ||
                      connection.name ||
                      'Connected user';

                    const displayRole =
                      connectedUser?.role || connection.role || '';

                    const displayDepartment =
                      connectedUser?.department ||
                      connection.department ||
                      'Department not specified';

                    const displayCompany =
                      connectedUser?.company || connection.company || '';

                    const displayYear =
                      connectedUser?.graduationYear ||
                      connection.graduationYear ||
                      '';

                    return (
                      <div
                        key={connection._id || `${displayName}-${index}`}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                      >
                        <h3 className="font-semibold text-gray-800">
                          {displayName}
                        </h3>

                        {displayRole && (
                          <p className="text-sm capitalize text-gray-600">
                            {displayRole}
                          </p>
                        )}

                        <p className="text-sm text-gray-600">
                          {displayDepartment}
                        </p>

                        {displayYear && (
                          <p className="text-sm text-gray-600">
                            Graduation Year: {displayYear}
                          </p>
                        )}

                        {displayCompany && (
                          <p className="text-sm text-gray-600">
                            Company: {displayCompany}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Alumni Graduation-Year Red-Black Tree */}
            <div className="mt-6 rounded-lg border border-purple-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Alumni Graduation-Year Tree
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Explore alumni grouped by graduation year using a
                    Red-Black Tree.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchAlumniTree}
                  disabled={alumniTreeLoading}
                  className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {alumniTreeLoading ? 'Loading Tree...' : 'Load Alumni Tree'}
                </button>
              </div>

              <div className="mt-4 rounded-lg bg-purple-50 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Algorithm:</span>{' '}
                  Red-Black Tree
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  <span className="font-semibold">Purpose:</span>{' '}
                  Organizes alumni by graduation year while maintaining
                  a balanced binary search tree.
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="inline-block h-3 w-3 rounded-full bg-red-600"></span>
                    Red node
                  </span>

                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="inline-block h-3 w-3 rounded-full bg-gray-900"></span>
                    Black node
                  </span>
                </div>
              </div>

              {alumniTreeMessage && (
                <p
                  role="status"
                  className="mt-4 rounded-lg bg-gray-50 p-3 text-gray-700"
                >
                  {alumniTreeMessage}
                </p>
              )}

              {hasLoadedAlumniTree && (
                <div className="mt-5 space-y-4">
                  {alumniTree.length === 0 && !alumniTreeLoading && (
                    <p className="text-gray-600">
                      No alumni with a recorded graduation year were found.
                    </p>
                  )}

                  {alumniTree.map((node) => (
                    <div
                      key={node.graduationYear}
                      className="overflow-hidden rounded-lg border border-gray-200"
                    >
                      <div
                        className={`flex flex-wrap items-center justify-between gap-3 p-4 text-white ${
                          node.color === 'RED'
                            ? 'bg-red-600'
                            : 'bg-gray-900'
                        }`}
                      >
                        <div>
                          <h3 className="text-lg font-bold">
                            Graduation Year: {node.graduationYear}
                          </h3>

                          <p className="text-sm text-white/90">
                            {node.alumniCount}{' '}
                            {node.alumniCount === 1 ? 'alumnus' : 'alumni'}
                          </p>
                        </div>

                        <span className="rounded-full border border-white/60 px-3 py-1 text-sm font-semibold">
                          {node.color} NODE
                        </span>
                      </div>

                      <div className="space-y-3 bg-white p-4">
                        {node.alumni.map((alumnus) => (
                          <div
                            key={alumnus._id}
                            className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                          >
                            <h4 className="font-semibold text-gray-800">
                              {alumnus.name}
                            </h4>

                            <p className="text-sm text-gray-600">
                              {alumnus.department ||
                                'Department not specified'}
                            </p>

                            <p className="text-sm text-gray-600">
                              Company: {alumnus.company || 'Not specified'}
                            </p>

                            <p className="text-sm text-gray-600">
                              Skills:{' '}
                              {Array.isArray(alumnus.skills) &&
                              alumnus.skills.length > 0
                                ? alumnus.skills.join(', ')
                                : 'Not specified'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Alumni Directory */}
            <div className="mt-6 rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Alumni Directory
              </h2>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  fetchAlumni(filters);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="department"
                    className="mb-1 block font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={filters.department}
                    onChange={handleFilterChange}
                    placeholder="e.g. Computer Science"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="graduationYear"
                    className="mb-1 block font-medium text-gray-700"
                  >
                    Graduation Year
                  </label>
                  <input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    value={filters.graduationYear}
                    onChange={handleFilterChange}
                    placeholder="e.g. 2024"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-1 block font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={filters.company}
                    onChange={handleFilterChange}
                    placeholder="e.g. TCS"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="skills"
                    className="mb-1 block font-medium text-gray-700"
                  >
                    Skills
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    value={filters.skills}
                    onChange={handleFilterChange}
                    placeholder="e.g. JavaScript"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2"
                  />
                </div>

                <button
                  type="submit"
                  disabled={alumniLoading}
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {alumniLoading ? 'Searching...' : 'Search Alumni'}
                </button>
              </form>

              {alumniMessage && (
                <p
                  role="status"
                  className="mt-4 rounded-lg bg-gray-50 p-3 text-gray-700"
                >
                  {alumniMessage}
                </p>
              )}

              {hasSearchedAlumni && (
                <div className="mt-6 space-y-4">
                  {alumni.length === 0 && !alumniLoading && (
                    <p className="text-gray-600">
                      No alumni found. Try changing your filters.
                    </p>
                  )}

                  {alumni.map((alumnus) => (
                    <div
                      key={alumnus._id}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {alumnus.name}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {alumnus.department || 'Department not specified'}
                      </p>

                      <p className="text-sm text-gray-600">
                        Graduation Year:{' '}
                        {alumnus.graduationYear || 'Not specified'}
                      </p>

                      <p className="text-sm text-gray-600">
                        Company: {alumnus.company || 'Not specified'}
                      </p>

                      <p className="text-sm text-gray-600">
                        Skills:{' '}
                        {Array.isArray(alumnus.skills)
                          ? alumnus.skills.join(', ')
                          : alumnus.skills || 'Not specified'}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => sendConnectionRequest(alumnus._id)}
                          disabled={
                            requestingUserId === alumnus._id ||
                            String(user?._id || '') === String(alumnus._id)
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {requestingUserId === alumnus._id
                            ? 'Sending...'
                            : 'Connect'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setTargetUserId(alumnus._id)}
                          className="rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 hover:bg-blue-50"
                        >
                          Use ID for Shortest Path
                        </button>
                      </div>

                      {connectionRequestMessages[alumnus._id] && (
                        <p
                          role="status"
                          className="mt-3 rounded-lg bg-white p-3 text-sm text-gray-700"
                        >
                          {connectionRequestMessages[alumnus._id]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BFS shortest path result */}
            {connectionPath && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6">
                <h2 className="mb-2 text-xl font-semibold text-green-800">
                  Connection Path Found
                </h2>

                <p className="mb-4 text-gray-700">
                  Number of connections: {connectionPath.connectionCount}
                </p>

                <div className="space-y-3">
                  {connectionPath.path.map((pathUser, index) => (
                    <div key={pathUser._id}>
                      <div className="rounded-lg border border-green-200 bg-white p-4">
                        <p className="font-semibold text-gray-800">
                          {pathUser.name}
                        </p>

                        <p className="text-sm capitalize text-gray-600">
                          {pathUser.role}
                          {pathUser.company ? ` · ${pathUser.company}` : ''}
                        </p>

                        <p className="text-sm text-gray-600">
                          {pathUser.department || 'Department not specified'}
                        </p>
                      </div>

                      {index < connectionPath.path.length - 1 && (
                        <p className="py-2 text-center font-medium text-blue-600">
                          ↓ Connected to ↓
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

