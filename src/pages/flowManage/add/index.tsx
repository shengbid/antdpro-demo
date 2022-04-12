import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
  MarkerType,
} from 'react-flow-renderer';

import Sidebar from '../components/sidebar';
import UpdateNode from '../components/nodeContent';
import UpdateEdge from '../components/edgeContent';
import CustomNode from '../components/customNode';
// 示例效果
import { nodes as listNodes, edges as listEdges } from './data';

import './index.less';

const nodeTypes = {
  custom: CustomNode,
};

const oldNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: '开始', nodeBg: '#ffffff', isHidden: false, id: '1' },
    style: { backgroundColor: '#ffffff' },
    className: 'nodeStyle',
    position: { x: 200, y: 60 },
  },
];
let initialNodes: any = [];
let initialEdges: any = [];

let id = 1;
const getId = () => {
  id += 1;
  return `${id}`;
};

const SmoothTransition = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeInfo, setNodeInfo] = useState<any>({});
  const [edgeInfo, setEdgeInfo] = useState<any>({});
  const [nodeShow, setNodeShow] = useState<boolean>(true);

  // 添加连接线
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        // console.log(params, eds);
        // params.animated = true
        // params.style = { stroke: '#f6ab6c' };
        params.label = '审批节点';
        params.markerEnd = {
          type: MarkerType.ArrowClosed,
        };
        return addEdge(params, eds);
      }),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // 删除节点
  const onChange = (val: any) => {
    // console.log(val)
    setNodes((nds) => nds.filter((item) => item.id !== val.id));
  };

  // 拖拽节点添加
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode: any = {
        id: getId(),
        type,
        position,
        data: { label: '', isHidden: false },
      };
      if (type === 'custom') {
        newNode.data.onChange = onChange;
        newNode.dragHandle = '.nodelabel';
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  // 点击节点
  const onNodeClick = (e: any, node: any) => {
    console.log(node);
    setNodeInfo({
      ...node.data,
      id: node.id,
      nodeBg: node.style && node.style.background ? node.style.background : '#ffffff',
    });
    setNodeShow(true);
  };

  // 点击节点连接线
  const onEdgeClick = (e: any, edge: any) => {
    // console.log(edge); // edge拿不到完整的数据?
    setEdgeInfo(edges.find((item) => edge.id === item.id));
    setNodeShow(false);
  };

  // 改变节点内容
  const changeNode = (val: any) => {
    setNodes((nds) =>
      nds.map((item) => {
        if (item.id === val.id) {
          item.data = val;
          item.hidden = val.isHidden;
          item.style = { background: val.nodeBg };
        }
        return item;
      }),
    );
    // console.log(val, nodes)
  };

  // 改变连接线内容
  const changeEdge = (val: any) => {
    setEdges((nds) =>
      nds.map((item) => {
        if (item.id === val.id) {
          item.label = val.label;
          item.type = val.type;
          item.style = { stroke: val.color };
        }
        return item;
      }),
    );
    // console.log(val, edges)
  };

  const { setViewport } = useReactFlow();
  setViewport({ x: 0, y: 0, zoom: 1.5 });

  return (
    <>
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultPosition={[0, 0]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          {nodeShow ? (
            <UpdateNode info={nodeInfo} onChange={changeNode} />
          ) : (
            <UpdateEdge info={edgeInfo} onChange={changeEdge} />
          )}
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};

const AddFlow: React.FC = (props: any) => {
  const { query } = props.location;
  if (query.id) {
    initialNodes = listNodes;
    initialEdges = listEdges;
  } else {
    initialNodes = oldNodes;
    initialEdges = [];
  }
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        {/* <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            defaultPosition={[0, 0]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <UpdateNode info={nodeInfo} onChange={changeNode} />
            <Controls />
            <Background />
          </ReactFlow>
        </div> */}
        <SmoothTransition />
      </ReactFlowProvider>
    </div>
  );
};

export default AddFlow;
