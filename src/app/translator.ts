import {Vertex} from '../model/Vertex';
import {Hex} from '../model/Hex';
import {Edge} from '../model/Edge';


/////////////////////////////////////////////////////////
//
//  Hex to adjacent
//
/////////////////////////////////////////////////////////
/**
 * used for e.g. generating reasonable islands
 * @param h Hex which adjacent Hexes are to be determined
 * @returns List of adjacent Hexes
 */
export function hexToAdjHexes(h: Hex): [ne: [x: number, y: number], e: [x: number, y: number], se: [x: number, y: number],
                                 sw: [x: number, y: number], w: [x: number, y: number], nw: [x: number, y: number]] {
  if (h.y % 2 !== 0) {
    return [[h.x, h.y - 1], [h.x + 1, h.y], [h.x, h.y + 1], [h.x - 1, h.y + 1], [h.x - 1, h.y], [h.x - 1, h.y - 1]];
  }else{
    return [[h.x + 1, h.y - 1], [h.x + 1, h.y], [h.x + 1, h.y + 1], [h.x, h.y + 1], [h.x - 1, h.y], [h.x, h.y - 1]];
  }
}

/**
 * used for e.g. distribute earnings
 * @param h Hex which adjacent Vertices are to be determined
 * @returns List of adjacent Edges
 */
function hexToAdjVertices(h: Hex): [n: Vertex, ne: Vertex, se: Vertex, s: Vertex, sw: Vertex, nw: Vertex] {
  return null;
}

/**
 * no example usage found yet
 * @param h Hex which adjacent Edges are to be determined
 * @returns List of adjacent Edges
 */
export function hexToAdjEdges(h: Hex): [ne: [x: number, y: number], e: [x: number, y: number], se: [x: number, y: number],
                                 sw: [x: number, y: number], w: [x: number, y: number], nw: [x: number, y: number]] {
  if (h.y % 2 !== 0) {
    return [[4 * h.x + 3, 2 * h.y], [4 * h.x + 4, 2 * h.y + 1], [4 * h.x + 3, 2 * h.y + 2],
            [4 * h.x + 1, 2 * h.y + 2], [4 * h.x, 2 * h.y + 1], [4 * h.x + 1, 2 * h.y]];
  }else{
    return [[4 * h.x + 5, 2 * h.y], [4 * h.x + 6, 2 * h.y + 1], [4 * h.x + 5, 2 * h.y + 2],
            [4 * h.x + 3, 2 * h.y + 2], [4 * h.x + 2, 2 * h.y + 1], [4 * h.x + 3, 2 * h.y]];
  }
}

/////////////////////////////////////////////////////////
//
//  Edge to adjacent
//
/////////////////////////////////////////////////////////
/**
 * used for e.g. denying streets in water and ships on land
 * @param e Edge which adjacent Hexes are to be determined
 * @returns List of adjacent Hexes
 */
function edgeToAdjHexes(e: Edge): [lefthand: Hex, righthand: Hex] {
  return null;
}

/**
 * used for e.g. denying starting to sail or exploring land without dock-like settlement
 * @param e Edge which adjacent Vertices are to be determined
 * @returns List of adjacent Edges
 */
function edgeToAdjVertices(e: Edge): [upper: Vertex, lower: Vertex] {
  return null;
}

/**
 * used for e.g. denying street and ships without connection
 * @param e Edge which adjacent Edges are to be determined
 * @returns List of adjacent Edges
 */
function edgeToAdjEdges(e: Edge): [clockwise1: Edge, clockwise2: Edge, clockwise3: Edge, clockwise4: Edge] {
  return null;
}

/////////////////////////////////////////////////////////
//
//  Vertex to adjacent
//
/////////////////////////////////////////////////////////
/**
 * used for e.g. denying settlement in water
 * @param v Vertex which adjacent Hexes are to be determined
 * @returns List of adjacent Hexes
 */
function VertexToAdjHexes(v: Vertex): [west: Hex, east: Hex, vertical: Hex] {
  return null;
}

/**
 * used for e.g. denying settlement directly next to another settlement
 * @param v Vertex which adjacent Vertices are to be determined
 * @returns List of adjacent Vertices
 */
function VertexToAdjVertices(v: Vertex): [west: Hex, east: Hex, vertical: Hex] {
  return null;
}

/**
 * used for e.g. denying settlement without connection
 * @param v Vertex which adjacent Edges are to be determined
 * @returns List of adjacent Edges
 */
function VertexToAdjEdges(v: Vertex): [west: Hex, east: Hex, vertical: Hex] {
  return null;
}
